import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { natsHost } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const microservice = app.connectMicroservice({
    transport: Transport.NATS,
    options: {
      servers: [natsHost]
    }
  });

  await app.startAllMicroservices();
  await app.listen(3002);
}
bootstrap();
