import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginData: { username: string; password: string }) {
    const { username, password } = loginData;
    return this.authService.login(username, password);
  }

  @Post('signup') 
  async signup(@Body() signupData: { username: string; password: string; email: string }) {
    const { username, password, email } = signupData;
    return this.authService.signup(username, password, email);
  }
}
