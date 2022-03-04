import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import resolvers from './graphql/resolvers';

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
            queue: 'cats_queue',
          },
        }),
        inject: [ConfigService],
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      path: `/${process.env.PREFIX || ''}/graphql`,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ...resolvers],
})
export class AppModule {}
