import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';

const expressApp = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  app.enableCors();
  app.setGlobalPrefix('api'); // Optional prefix

  await app.init();
}

bootstrap();

// Export serverless function handler for Vercel
export const handler = (req: any, res: any) => {
  expressApp(req, res);
};
