import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS if needed
  app.enableCors();

  // Set the global prefix for APIs
  app.setGlobalPrefix('api'); // Example: /api/tasks

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
