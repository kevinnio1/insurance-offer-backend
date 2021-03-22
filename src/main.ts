import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(helmet());

  app.enableCors();

  /**
   * Swagger implementation
   */
  let options = new DocumentBuilder()
    .setTitle('Insurance API')
    .setDescription('The Insurance API')
    .setVersion('1.0');

  // can customize swagger options when working with aut0
  let swaggerOptions: SwaggerCustomOptions = {};

  const document = SwaggerModule.createDocument(app, options.build());

  SwaggerModule.setup('/api', app, document, {
    swaggerOptions,
  });

  await app.listen(5000);
}

bootstrap();
