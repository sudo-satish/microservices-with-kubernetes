import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('ITEM_MICROSERVICE1') private client: ClientProxy,
    private jwtService: JwtService,
  ) {}

  @Get()
  getHello() {
    const pattern = { cmd: 'sum' };
    const payload = [1, 2, 3];
    return this.client.send<number>(pattern, payload);
  }

  @Get('/login')
  login() {
    return this.jwtService.sign({ name: 'Satish' }, { expiresIn: 60 * 60 });
  }

  @Post('/verify')
  verify(@Body() body) {
    return this.jwtService.verify(body.token);
  }

  async onApplicationBootstrap() {
    await this.client.connect();
  }
}
