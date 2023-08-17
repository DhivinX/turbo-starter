import express from 'express';
import * as http from 'http';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '@/app.module';
import { ZodValidationPipe, publicDir } from '@/common';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

declare const module: any;

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server)
  );

  const logger = new Logger('APP');

  const configService = app.get(ConfigService);
  const port = configService.get<number>('http.port');
  const origins = configService.get<string[]>('http.cors');

  app.enableCors({
    origin: origins,
    credentials: true,
  });

  app.use(
    helmet.contentSecurityPolicy({
      useDefaults: true,
      directives: {
        'img-src': [`'self'`, 'https: data:'],
      },
    })
  );

  app.use(cookieParser());
  app.useGlobalPipes(new ZodValidationPipe());
  app.useStaticAssets(publicDir());

  const config = new DocumentBuilder().setTitle('turbo-nestjs-vue').setVersion('0.1').build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.init();
  const httpServer = http.createServer(server).listen(port);

  logger.log(`🚀 The server was started in \x1b[35mHTTP\x1b[32m mode on port \x1b[36m${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
      app.close();
      httpServer.close();
    });
  }
}

bootstrap();
