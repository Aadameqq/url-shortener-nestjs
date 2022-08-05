import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);
  await app.listen(3000);
}

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Url Shortener API')
    .setVersion('1.0')
    .addSecurity('auth', {
      type: 'http',
      description: 'Use token received from /auth/login endpoint',
      scheme: 'bearer',
    })
    .addTag('Auth', 'Authenticate')
    .addTag('Redirect', "Manage user's redirects")
    .addTag('Account', 'Manage account')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
bootstrap();
