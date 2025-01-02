import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
import { Server } from 'http';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // Enable CORS if required
  app.enableCors();

  // Set a global prefix for API routes (optional)
  app.setGlobalPrefix('api');

  await app.init();
}

bootstrap();

// Export the server for Vercel
export const handler = (req: any, res: any) => {
  server(req, res);
};
