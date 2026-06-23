# Trazabilidad - Correlation ID

## Visión General

El sistema de trazabilidad permite seguir una operación completa a través de todos los microservicios usando un **Correlation ID** (UUID).

## Flujo de Trazabilidad

```
┌─────────┐     ┌──────────┐     ┌──────────────────┐     ┌───────────────┐
│ Cliente │────▶│ Gateway  │────▶│ notification-api │────▶│ channel-worker│
└─────────┘     └──────────┘     └──────────────────┘     └───────────────┘
       │                │                    │                        │
       │   X-Correlation-ID: abc-123        │                        │
       │────────────────────────────────────────────────────────────▶│
       │                                                             │
       │                    Todos los logs incluyen                  │
       │                    este correlation ID                      │
       │                                                             │
       ▼                                                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        MongoDB (Logs)                                   │
│  { correlationId: "abc-123", service: "notification-api", ... }        │
│  { correlationId: "abc-123", service: "channel-worker", ... }          │
─────────────────────────────────────────────────────────────────────────┘
```

## Reglas del Correlation ID

| Regla | Descripción |
|-------|-------------|
| **Único por operación** | Cada solicitud/operación tiene su propio UUID |
| **Persistente en el flujo** | El mismo UUID viaja por todos los servicios |
| **Generado una vez** | Se genera en el primer servicio (gateway) o en el cliente |
| **Propagado automáticamente** | Cada servicio lo pasa al siguiente |

## Implementación por Servicio

### 1. Gateway

```typescript
// Genera o recibe el correlation ID
const correlationId = req.headers['x-correlation-id'] || uuidv4();

// Lo pasa al siguiente servicio
fetch('http://notification-api:3001/api/notifications/send', {
  headers: {
    'X-Correlation-ID': correlationId,
    'X-Product-Key': apiKey,
  },
});
```

### 2. notification-api

```typescript
// Middleware extrae el correlation ID
const correlationId = req.headers['x-correlation-id'] || uuidv4();

// Lo usa en logs
console.log(JSON.stringify({
  correlationId,
  message: 'Notification queued',
}));

// Lo incluye en el mensaje de la cola
rabbitmq.publish('notifications', {
  correlationId,
  productId,
  channel,
  destination,
  content,
});
```

### 3. channel-worker

```typescript
// Consume el mensaje con correlation ID
const message = await channel.consume('notifications');
const { correlationId, productId, channel, destination, content } = message;

// Lo usa en logs
console.log(JSON.stringify({
  correlationId,
  message: 'Email sent successfully',
}));

// Lo guarda en MongoDB
await db.collection('logs').insertOne({
  correlationId,
  notificationId,
  status: 'sent',
  timestamp: new Date(),
});
```

## Estructura del Log

```json
{
  "timestamp": "2026-06-22T10:30:00.000Z",
  "level": "INFO",
  "service": "notification-api",
  "context": "NotificationsService.send",
  "correlationId": "550e8400-e29b-41d4-a716-446655440000",
  "notificationId": "660e8400-e29b-41d4-a716-446655440001",
  "message": "Notification queued",
  "metadata": {
    "productId": "prod-123",
    "channel": "email",
    "destination": "user@example.com"
  }
}
```

## Campos del Log

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `timestamp` | ISO 8601 | Fecha y hora del evento |
| `level` | string | LOG, ERROR, WARN, DEBUG, VERBOSE |
| `service` | string | Nombre del microservicio |
| `context` | string | Clase/método que genera el log |
| `correlationId` | UUID | ID de trazabilidad |
| `notificationId` | UUID | ID único de la notificación |
| `message` | string | Descripción del evento |
| `metadata` | object | Datos adicionales específicos |

## Consultas de Trazabilidad

### Buscar por Correlation ID

```bash
# Todos los logs de una operación
grep "550e8400-e29b-41d4-a716-446655440000" logs/*.json

# Con jq para formato legible
grep "550e8400-e29b-41d4-a716-446655440000" logs/*.json | jq .
```

### Buscar por Notification ID

```bash
# Seguir una notificación específica
grep "660e8400-e29b-41d4-a716-446655440001" logs/*.json
```

### Buscar por Producto

```bash
# Todos los logs de un producto
grep '"productId": "prod-123"' logs/*.json
```

## Herramientas de Producción

### Kibana / Elasticsearch

```json
{
  "query": {
    "match": {
      "correlationId": "550e8400-e29b-41d4-a716-446655440000"
    }
  }
}
```

### Datadog

```
correlationId:550e8400-e29b-41d4-a716-446655440000
```

### Grafana Loki

```
{service="notification-api"} |~ "550e8400-e29b-41d4-a716-446655440000"
```

## Diferencia entre IDs

| ID | Scope | Ejemplo de Uso |
|----|-------|----------------|
| `correlationId` | Flujo completo | Trazar operación de inicio a fin |
| `notificationId` | Notificación específica | Identificar una notificación única |
| `productId` | Producto | Filtrar logs por producto |
| `templateId` | Plantilla | Identificar plantilla usada |

### Ejemplo de Relación

```json
{
  "correlationId": "abc-123",
  "notificationId": "notif-456",
  "productId": "prod-789",
  "templateId": "tmpl-012"
}
```

- **correlationId**: Sigue el flujo completo (gateway → api → worker → DB)
- **notificationId**: Identifica esta notificación específica
- **productId**: Indica qué producto envió la notificación
- **templateId**: Indica qué plantilla se usó

## Mejores Prácticas

1. **Siempre incluir correlationId** en todos los logs
2. **Generar early** - Lo antes posible en el flujo
3. **Propagar siempre** - Pasarlo a cada servicio downstream
4. **Logs estructurados** - Usar JSON para facilitar consultas
5. **Niveles apropiados** - INFO para flujo normal, ERROR para fallos
6. **Contexto suficiente** - Incluir datos relevantes para debugging
