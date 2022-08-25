import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { UserService } from 'src/user/user.service';
import { RegisterDto } from './models/register.dto';

@Controller()
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    if (body.password !== body.password_confirm) {
      throw new BadRequestException('Passwords do not match!');
    }
    const hashed = await bcrypt.hash(body.password, 12);

    return this.userService.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password: hashed,
    });
  }
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid Credentials');
    }
    return user;
  }
}
