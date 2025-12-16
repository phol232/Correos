import { FastifyInstance } from 'fastify';
import { EmailService } from '../services/email.service';

const emailService = new EmailService();

export async function emailRoutes(fastify: FastifyInstance) {
  fastify.post('/send', async (request, reply) => {
    const { to, toName, subject, htmlContent, textContent } = request.body as any;

    if (!to || !subject) {
      return reply.status(400).send({
        error: 'Los campos "to" y "subject" son obligatorios',
      });
    }

    if (!htmlContent && !textContent) {
      return reply.status(400).send({
        error: 'Debes proporcionar al menos "htmlContent" o "textContent"',
      });
    }

    try {
      const result = await emailService.sendEmail({
        to,
        toName,
        subject,
        htmlContent,
        textContent,
      });

      return reply.status(200).send({
        message: 'Correo enviado exitosamente',
        data: result,
      });
    } catch (error: any) {
      return reply.status(500).send({
        error: error.message,
      });
    }
  });

  fastify.get('/health', async (request, reply) => {
    return { status: 'ok', service: 'email-service' };
  });
}
