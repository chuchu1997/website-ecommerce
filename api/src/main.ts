import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions/all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // ✅ Hỗ trợ x-www-form-urlencoded
  // app.use(bodyParser.urlencoded({ extended: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(bodyParser.urlencoded({ extended: true })); // 👈 Bắt buộc nếu không gửi dạng JSON
  app.use(json({ limit: '25mb' }));
  app.use(urlencoded({ extended: true, limit: '25mb' }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
