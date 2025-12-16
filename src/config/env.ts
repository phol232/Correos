import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000'),
  brevoApiKey: process.env.BREVO_API_KEY || '',
  fromEmail: process.env.FROM_EMAIL || '',
  fromName: process.env.FROM_NAME || 'Servicio de Correos',
};

if (!config.brevoApiKey) {
  throw new Error('BREVO_API_KEY no está configurada en las variables de entorno');
}

if (!config.fromEmail) {
  throw new Error('FROM_EMAIL no está configurada en las variables de entorno');
}
