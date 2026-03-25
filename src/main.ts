import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './shared/config/env.service';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './shared/swagger/setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  const configService = app.get(EnvService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  setupSwagger(app);

  await app.listen(configService.get('PORT') ?? 3000);
}
bootstrap();
