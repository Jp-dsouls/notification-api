import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { CorrelationIdInterceptor } from './common/interceptors/correlation-id.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Notification API')
    .setDescription('API for managing products, channels, templates, and notifications')
    .setVersion('1.0')
    .addTag('products', 'Product management')
    .addTag('channels', 'Channel management')
    .addTag('templates', 'Template management')
    .addTag('notifications', 'Notification sending and querying')
    .addApiKey({ type: 'apiKey', name: 'X-Product-Key', in: 'header' }, 'product-key')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.map((error) => {
          const constraints = error.constraints
            ? Object.values(error.constraints)
            : ['Invalid property'];
          return {
            property: error.property,
            messages: constraints,
          };
        });

        return {
          statusCode: 422,
          error: 'Unprocessable Entity',
          message: messages,
        };
      },
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new CorrelationIdInterceptor());

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Notification API running on port ${port}`);
  console.log(`Swagger docs: http://localhost:${port}/docs`);
}

bootstrap();
