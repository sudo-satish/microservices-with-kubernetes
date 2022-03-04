import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.NATS,
    options: {
      servers: [configService.get('NATS_CONNECTION_URL')],
    },
  });

  await app.startAllMicroservices();
  app.setGlobalPrefix(configService.get('PREFIX'));
  const PORT = +configService.get('PORT') || 3001;

  await app.listen(PORT);
}
bootstrap();
