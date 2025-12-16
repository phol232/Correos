# Servicio de Envío de Correos

Backend con Node.js, TypeScript, Fastify y Brevo para envío de correos electrónicos.

## Instalación

```bash
pnpm install
```

## Configuración

1. Copia el archivo `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. Configura las variables de entorno en `.env`:
   - `BREVO_API_KEY`: Tu API key de Brevo
   - `FROM_EMAIL`: Email desde el cual se enviarán los correos
   - `FROM_NAME`: Nombre del remitente
   - `PORT`: Puerto del servidor (por defecto 3000)

## Uso

### Desarrollo
```bash
pnpm dev
```

### Producción
```bash
pnpm build
pnpm start
```

## Endpoints

### POST /api/email/send
Envía un correo electrónico.

**Body:**
```json
{
  "to": "destinatario@ejemplo.com",
  "toName": "Nombre Destinatario",
  "subject": "Asunto del correo",
  "htmlContent": "<h1>Hola</h1><p>Este es un correo HTML</p>",
  "textContent": "Este es el contenido en texto plano"
}
```

**Respuesta exitosa:**
```json
{
  "message": "Correo enviado exitosamente",
  "data": {
    "success": true,
    "messageId": "..."
  }
}
```

### GET /api/email/health
Verifica el estado del servicio.

**Respuesta:**
```json
{
  "status": "ok",
  "service": "email-service"
}
```

## Ejemplo de uso con curl

```bash
curl -X POST http://localhost:3000/api/email/send \
  -H "Content-Type: application/json" \
  -d '{
    "to": "destinatario@ejemplo.com",
    "toName": "Juan Pérez",
    "subject": "Correo de prueba",
    "htmlContent": "<h1>Hola Juan</h1><p>Este es un correo de prueba</p>"
  }'
```
