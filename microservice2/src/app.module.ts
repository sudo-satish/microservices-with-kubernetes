import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { natsHost } from './config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: 'ITEM_MICROSERVICE1',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          name: 'ITEM_MICROSERVICE1',
          transport: Transport.NATS,
          options: {
            servers: [configService.get('NATS_CONNECTION_URL')],
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
