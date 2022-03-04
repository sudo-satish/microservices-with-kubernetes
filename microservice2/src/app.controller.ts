import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('ITEM_MICROSERVICE1') private client: ClientProxy,
    private jwtService: JwtService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/login')
  async login(@Body() body) {
    const { token } = body;
    const payload = this.jwtService.verify(token);
    return payload;
  }

  @MessagePattern({ cmd: 'sum' })
  accumulate(data: number[], options): number {
    console.log('Command Executed', JSON.stringify(options));
    return (data || []).reduce((a, b) => a + b);
  }

  @EventPattern('user_created')
  userCreated(data: Record<string, unknown>): number {
    console.log('user created!');
    console.log(data);
    return 10;
  }

  async onApplicationBootstrap() {
    await this.client.connect();
  }
}
