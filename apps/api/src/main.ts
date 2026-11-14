import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { APP_CONFIG } from '@convoza/configuration';

async function bootstrap() {
  const logger = new Logger('CONVOZA-Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Security Headers
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    })
  );

  // Compression for high performance responses
  app.use(compression());

  // CORS Configuration
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global API Prefix
  app.setGlobalPrefix('api/v1');

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  // Global Filters & Interceptors
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  // OpenAPI / Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('CONVOZA API')
    .setDescription(
      'Official WhatsApp Business Automation SaaS REST API engine. Conversations. Connected.'
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .addTag('Authentication', 'User onboarding, login, session tokens and refresh')
    .addTag('Organizations', 'Multi-tenant organization & team management')
    .addTag('WhatsApp Business Integration', 'Meta Cloud API onboarding, WABA connection, phone numbers')
    .addTag('WhatsApp Message Templates', 'Template builder, dynamic variables, and Meta approval sync')
    .addTag('Contacts & Audience Management', 'Contacts, tags, lists, CSV import, consent tracking')
    .addTag('WhatsApp Messages', 'Individual message sending, 24h window enforcement')
    .addTag('Bulk WhatsApp Campaigns', 'High-throughput campaign creation, scheduling, tracking')
    .addTag('Shared WhatsApp Inbox', '3-column team inbox with Socket.IO real-time updates')
    .addTag('Automations & Rule Engine', 'Event triggers, conditions, and automated actions')
    .addTag('Analytics & Performance Reports', 'Dashboard metrics, time-series, and campaign analytics')
    .addTag('Subscriptions & Billing', 'Razorpay checkout, plans, usage counters, invoices')
    .addTag('Webhooks Ingestion', 'Meta WhatsApp & payment webhooks')
    .addTag('Super Admin Operations', 'Platform administration and tenant management')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'CONVOZA API Documentation',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT || APP_CONFIG.DEFAULT_PORT;
  await app.listen(port, '0.0.0.0');

  logger.log(`=======================================================`);
  logger.log(` CONVOZA Backend API Server running on port ${port}`);
  logger.log(` REST Endpoints Prefix: http://localhost:${port}/api/v1`);
  logger.log(` Swagger Documentation: http://localhost:${port}/api/docs`);
  logger.log(`=======================================================`);
}

bootstrap();

