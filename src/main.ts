import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get<string>('API_PORT', process.env.PORT) || 3000;

  const cors = {
    origin: [
      'http://localhost:5173',
      'http://localhost',
      'https://www.erp.meviosshop.com.br',
      'https://erp.meviosshop.com.br',
      'https://mini-erp-eight.vercel.app',
    ],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: ['Accept', 'Content-Type', 'Authorization'],
  };

  app.enableCors(cors);

  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Mini ERP API')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  console.log(process.env);

  await app.listen(port);
}
bootstrap();
