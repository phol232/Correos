import * as brevo from '@getbrevo/brevo';
import { config } from '../config/env';

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, config.brevoApiKey);

export interface EmailData {
  to: string;
  toName?: string;
  subject: string;
  htmlContent?: string;
  textContent?: string;
}

export class EmailService {
  async sendEmail(data: EmailData) {
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    
    sendSmtpEmail.sender = {
      email: config.fromEmail,
      name: config.fromName,
    };
    
    sendSmtpEmail.to = [
      {
        email: data.to,
        name: data.toName || data.to,
      },
    ];
    
    sendSmtpEmail.subject = data.subject;
    sendSmtpEmail.htmlContent = data.htmlContent || data.textContent || '';
    sendSmtpEmail.textContent = data.textContent;

    try {
      const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
      return {
        success: true,
        messageId: response.body.messageId,
      };
    } catch (error: any) {
      throw new Error(`Error al enviar correo: ${error.message}`);
    }
  }
}
