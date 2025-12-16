import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as brevo from '@getbrevo/brevo';

const apiInstance = new brevo.TransactionalEmailsApi();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { pathname } = new URL(req.url || '', `http://${req.headers.host}`);

  // Health check
  if (pathname === '/api/email/health' && req.method === 'GET') {
    return res.status(200).json({
      status: 'ok',
      service: 'email-service',
      timestamp: new Date().toISOString(),
    });
  }

  // Send email
  if (pathname === '/api/email/send' && req.method === 'POST') {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'BREVO_API_KEY no configurada' });
    }

    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);

    const { to, toName, subject, htmlContent, textContent } = req.body;

    if (!to || !subject) {
      return res.status(400).json({
        error: 'Los campos "to" y "subject" son obligatorios',
      });
    }

    if (!htmlContent && !textContent) {
      return res.status(400).json({
        error: 'Debes proporcionar al menos "htmlContent" o "textContent"',
      });
    }

    try {
      const sendSmtpEmail = new brevo.SendSmtpEmail();
      
      sendSmtpEmail.sender = {
        email: process.env.FROM_EMAIL || '',
        name: process.env.FROM_NAME || 'Servicio de Correos',
      };
      
      sendSmtpEmail.to = [
        {
          email: to,
          name: toName || to,
        },
      ];
      
      sendSmtpEmail.subject = subject;
      sendSmtpEmail.htmlContent = htmlContent || textContent || '';
      sendSmtpEmail.textContent = textContent;

      const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
      
      return res.status(200).json({
        message: 'Correo enviado exitosamente',
        data: {
          success: true,
          messageId: response.body.messageId,
        },
      });
    } catch (error: any) {
      console.error('Error al enviar correo:', error);
      return res.status(500).json({
        error: `Error al enviar correo: ${error.message}`,
      });
    }
  }

  return res.status(404).json({ error: 'Ruta no encontrada' });
}
