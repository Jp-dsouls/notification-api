# Historias de Usuario - notification-api

## ÉPICA 1: Gestión de Productos y Canales

### HU-1.1: Registro de Productos

> Como administrador, quiero registrar un nuevo producto y generar una API_KEY única, para permitir que ese sistema externo consuma la plataforma.

**Criterios de aceptación:**

- [ ] POST `/products` crea el producto con `name`, `status`
- [ ] Se genera automáticamente un `api_key` UUID v4
- [ ] El producto se crea con `status = active` por defecto
- [ ] PUT `/products/:id/status` permite activar/inactivar
- [ ] GET `/products` lista todos los productos (paginado)
- [ ] Si el producto está inactivo, la API Key es rechazada en el gateway

---

### HU-1.2: Gestión de Canales

> Como administrador, quiero registrar los canales disponibles (Email, SMS, WhatsApp) con su configuración de proveedor.

**Criterios de aceptación:**

- [ ] POST `/channels` crea un canal con `name` y `config_schema` (JSON)
- [ ] GET `/channels` lista los canales disponibles
- [ ] PUT `/channels/:id` actualiza la configuración del proveedor

---

### HU-1.3: Asociación de Canales por Producto

> Como administrador, quiero asignar qué canales tiene permitidos cada producto, para controlar los flujos autorizados.

**Criterios de aceptación:**

- [ ] POST `/products/:id/channels` asocia un canal al producto con `is_enabled`
- [ ] DELETE `/products/:id/channels/:channelId` desasocia un canal
- [ ] PUT `/products/:id/channels/:channelId` activa/desactiva un canal
- [ ] GET `/products/:id/channels` lista los canales de un producto
- [ ] Si un producto intenta usar un canal no asociado → error 403

---

## ÉPICA 2: Gestión de Plantillas

### HU-2.1: Creación de Plantillas

> Como administrador, quiero crear plantillas vinculadas a un producto y canal específico, para segmentar los mensajes.

**Criterios de aceptación:**

- [ ] POST `/templates` con `product_id`, `channel_id`, `name`, `body`
- [ ] Valida que `product_id` exista y esté activo
- [ ] Valida que `channel_id` esté asociado y activo para ese producto
- [ ] El `body` soporta variables con sintaxis `{{variable}}`
- [ ] GET `/templates?product_id=X&channel_id=Y` filtra plantillas
- [ ] PUT `/templates/:id` actualiza el contenido
- [ ] DELETE `/templates/:id` elimina la plantilla

---

## ÉPICA 4: Envío y Encolamiento de Notificaciones

### HU-4.1: Recepción de Solicitud de Notificación

> Como sistema externo, quiero enviar una petición con mi API Key, el ID de plantilla y los datos variables, para encolar el envío.

**Criterios de aceptación:**

- [ ] POST `/notifications/send` acepta: `template_id`, `destination`, `variables`
- [ ] Valida que la plantilla pertenezca al producto (vía `product_id` del gateway)
- [ ] Valida que el canal de la plantilla esté activo para el producto
- [ ] Renderiza el `body` de la plantilla reemplazando `{{variables}}`
- [ ] Publica en RabbitMQ: `{ product_id, channel, destination, content, timestamp }`
- [ ] Responde 202 Accepted con un `notification_id` (UUID)
- [ ] Si la plantilla no pertenece al producto → 403

---

### HU-4.2: Consulta de Estado de Notificación

> Como sistema externo, quiero consultar el estado de una notificación enviada.

**Criterios de aceptación:**

- [ ] GET `/notifications/:id` retorna: status, canal, destino, timestamp
- [ ] GET `/notifications?product_id=X` lista notificaciones del producto (paginado)
