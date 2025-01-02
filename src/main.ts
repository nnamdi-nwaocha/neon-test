import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors(); // Enable CORS if needed
  app.setGlobalPrefix('api'); // Prefix all routes with '/api'
  await app.init();
}

bootstrap();

// Export handler for Vercel
export const handler = server;
