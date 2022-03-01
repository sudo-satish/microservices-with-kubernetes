import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,  @Inject('ITEM_MICROSERVICE1') private client: ClientProxy) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'sum' })
  accumulate(data: number[]): number {
    console.log('Command Executed')
    return (data || []).reduce((a, b) => a + b);
  }

  async onApplicationBootstrap() {

    await this.client.connect();
  }
}
