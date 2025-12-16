import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import path from 'path';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { emailRoutes } from '../src/routes/email.routes';

const app = Fastify({
  logger: true,
});

let isReady = false;

async function build() {
  if (isReady) return app;

  await app.register(cors, {
    origin: true,
  });

  await app.register(fastifyStatic, {
    root: path.join(__dirname, '../public'),
    prefix: '/',
  });

  await app.register(emailRoutes, { prefix: '/api/email' });

  await app.ready();
  isReady = true;
  
  return app;
}

export default async (req: VercelRequest, res: VercelResponse) => {
  await build();
  app.server.emit('request', req, res);
};
