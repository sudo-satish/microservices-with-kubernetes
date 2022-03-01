import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { natsHost } from './config';

@Module({
  imports: [
    ClientsModule.register([{
        name: 'ITEM_MICROSERVICE1',
        transport: Transport.NATS,
        options: {
          servers: [natsHost],
        },
      },])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
