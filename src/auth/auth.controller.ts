import { Controller, Post } from '@nestjs/common';

@Controller()
export class AuthController {
  @Post('register')
  async register() {
    return 'register';
  }
}