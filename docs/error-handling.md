# Manejo de Errores y Trazabilidad - notification-api

## Códigos HTTP Utilizados

### Éxito (2xx)

| Código | Uso | Ejemplo |
|--------|-----|---------|
| 200 OK | Consultas exitosas | GET /api/products, GET /api/channels |
| 201 Created | Creación de recursos | POST /api/products, POST /api/channels, POST /api/templates |
| 202 Accepted | Notificación encolada | POST /api/notifications/send |

### Errores del Cliente (4xx)

| Código | Excepción | Cuándo se usa |
|--------|-----------|---------------|
| 400 Bad Request | `ChannelNotAssociatedException` | Canal no está asociado al producto |
| 401 Unauthorized | - | API Key inválida (manejado por gateway) |
| 403 Forbidden | `ProductInactiveException` | Producto está inactivo |
| 403 Forbidden | `ChannelDisabledException` | Canal no está habilitado para el producto |
| 403 Forbidden | `TemplateNotBelongToProductException` | Plantilla no pertenece al producto |
| 404 Not Found | `ProductNotFoundException` | Producto no existe |
| 404 Not Found | `ChannelNotFoundException` | Canal no existe |
| 404 Not Found | `TemplateNotFoundException` | Plantilla no existe |
| 409 Conflict | `ProductAlreadyExistsException` | Nombre de producto duplicado |
| 409 Conflict | `ChannelAlreadyExistsException` | Nombre de canal duplicado |
| 422 Unprocessable Entity | `ValidationPipe` | Datos de entrada inválidos |
| 429 Too Many Requests | - | Rate limiting (manejado por gateway) |

### Errores del Servidor (5xx)

| Código | Cuándo se usa |
|--------|---------------|
| 500 Internal Server Error | Errores inesperados, fallos de BD |

---

## Formato de Respuesta de Error

```json
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "Product with id \"abc-123\" not found",
  "timestamp": "2026-06-22T10:30:00.000Z",
  "path": "/api/products/abc-123",
  "correlationId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### Error de Validación (422)

```json
{
  "statusCode": 422,
  "error": "Unprocessable Entity",
  "message": [
    {
      "property": "name",
      "messages": ["name should not be empty", "name must be a string"]
    }
  ],
  "timestamp": "2026-06-22T10:30:00.000Z",
  "path": "/api/products",
  "correlationId": "550e8400-e29b-41d4-a716-446655440000"
}
```

---

## Trazabilidad con Correlation ID

### ¿Qué es el Correlation ID?

Es un UUID único que identifica una operación completa a través de múltiples servicios. Permite rastrear el flujo completo de una solicitud desde el gateway hasta el worker final.

### Cómo Funciona

1. **Gateway** genera el correlation ID (o lo recibe del cliente)
2. **notification-api** recibe el correlation ID en el header `X-Correlation-ID`
3. **channel-worker** recibe el mismo correlation ID cuando consume el mensaje de la cola
4. **Todos los logs** incluyen el correlation ID para trazabilidad

### Headers HTTP

| Header | Dirección | Descripción |
|--------|-----------|-------------|
| `X-Correlation-ID` | Entrada/Salida | UUID de trazabilidad |
| `X-Product-Key` | Entrada | API Key del producto (gateway) |
| `X-Product-ID` | Interna | ID del producto después de validación |

### Ejemplo de Flujo Completo

```
Cliente → Gateway → notification-api → RabbitMQ → channel-worker → MongoDB
         │           │                              │
         └─ X-Correlation-ID: abc-123 ──────────────┘
```

### Logs Estructurados

Todos los logs usan formato JSON con correlation ID:

```json
{
  "timestamp": "2026-06-22T10:30:00.000Z",
  "level": "INFO",
  "service": "notification-api",
  "context": "NotificationsService.send",
  "correlationId": "550e8400-e29b-41d4-a716-446655440000",
  "notificationId": "660e8400-e29b-41d4-a716-446655440001",
  "message": "Notification queued",
  "payload": {
    "productId": "prod-123",
    "channel": "email",
    "destination": "user@example.com"
  }
}
```

### Buscar Logs por Correlation ID

```bash
# Buscar todos los logs de una operación específica
grep "550e8400-e29b-41d4-a716-446655440000" logs/*.json

# En producción con herramientas como Kibana, Datadog, etc.
correlationId: "550e8400-e29b-41d4-a716-446655440000"
```

---

## Excepciones Personalizadas

### Producto

| Excepción | Código | Descripción |
|-----------|--------|-------------|
| `ProductNotFoundException` | 404 | Producto no encontrado |
| `ProductAlreadyExistsException` | 409 | Nombre de producto duplicado |
| `ProductInactiveException` | 403 | Producto está inactivo |

### Canal

| Excepción | Código | Descripción |
|-----------|--------|-------------|
| `ChannelNotFoundException` | 404 | Canal no encontrado |
| `ChannelAlreadyExistsException` | 409 | Nombre de canal duplicado |
| `ChannelNotAssociatedException` | 400 | Canal no asociado al producto |
| `ChannelDisabledException` | 403 | Canal deshabilitado para el producto |

### Plantilla

| Excepción | Código | Descripción |
|-----------|--------|-------------|
| `TemplateNotFoundException` | 404 | Plantilla no encontrada |
| `TemplateNotBelongToProductException` | 403 | Plantilla no pertenece al producto |

---

## Implementación Técnica

### Middleware de Correlation ID

```typescript
// src/common/middleware/correlation-id.middleware.ts
@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let correlationId = req.headers['x-correlation-id'] as string;

    if (!correlationId) {
      correlationId = uuidv4();
    }

    (req as Request & { correlationId: string }).correlationId = correlationId;
    res.setHeader('X-Correlation-ID', correlationId);

    next();
  }
}
```

### Decorador para Controllers

```typescript
// src/common/decorators/correlation-id.decorator.ts
export const CorrelationId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.correlationId || request.headers['x-correlation-id'] || 'N/A';
  },
);
```

### Uso en Controllers

```typescript
@Post('send')
send(
  @Headers('x-product-id') productId: string,
  @Body() dto: SendNotificationDto,
  @CorrelationId() correlationId: string,
) {
  return this.notificationsService.send(productId, dto, correlationId);
}
```

---

## Logging de Errores

Todos los errores se loguean automáticamente con:
- Método HTTP y URL
- Código de estado
- Mensaje de error
- Correlation ID para trazabilidad

Ejemplo de log:
```json
{
  "timestamp": "2026-06-22T10:30:00.000Z",
  "level": "ERROR",
  "service": "notification-api",
  "correlationId": "550e8400-e29b-41d4-a716-446655440000",
  "method": "POST",
  "url": "/api/products",
  "statusCode": 409,
  "message": "Product with name \"E-commerce\" already exists"
}
```
