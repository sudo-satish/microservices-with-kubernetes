import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, @Inject('ITEM_MICROSERVICE1') private client: ClientProxy) {}

  @Get()
  getHello() {
    const pattern = { cmd: 'sum' };
    const payload = [1, 2, 3];
    return this.client.send<number>(pattern, payload);
    // return this.appService.getHello();
  }

  async onApplicationBootstrap() {

    await this.client.connect();
  }
}
