import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
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
  accumulate(data: number[]): number {
    console.log('Command Executed');
    return (data || []).reduce((a, b) => a + b);
  }

  async onApplicationBootstrap() {
    await this.client.connect();
  }
}
