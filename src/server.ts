import Fastify from 'fastify';
import cors from '@fastify/cors';
import { config } from './config/env';
import { emailRoutes } from './routes/email.routes';

const fastify = Fastify({
  logger: true,
});

async function build() {
  await fastify.register(cors, {
    origin: true,
  });

  await fastify.register(emailRoutes, { prefix: '/api/email' });

  return fastify;
}

// Para desarrollo local
if (require.main === module) {
  build().then(async (app) => {
    try {
      await app.listen({ port: config.port, host: '0.0.0.0' });
      console.log(`🚀 Servidor corriendo en http://localhost:${config.port}`);
    } catch (err) {
      app.log.error(err);
      process.exit(1);
    }
  });
}

// Para Vercel
export default async (req: any, res: any) => {
  const app = await build();
  await app.ready();
  app.server.emit('request', req, res);
};
