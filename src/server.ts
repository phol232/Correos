import Fastify from 'fastify';
import cors from '@fastify/cors';
import { config } from './config/env';
import { emailRoutes } from './routes/email.routes';

const fastify = Fastify({
  logger: true,
});

async function start() {
  try {
    await fastify.register(cors, {
      origin: true,
    });

    await fastify.register(emailRoutes, { prefix: '/api/email' });

    await fastify.listen({ port: config.port, host: '0.0.0.0' });
    
    console.log(`🚀 Servidor corriendo en http://localhost:${config.port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
