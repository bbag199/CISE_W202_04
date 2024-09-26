import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
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

  // Protected route - accessible only with a valid JWT token
  @UseGuards(AuthGuard)  // Apply the JWT Auth Guard
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;  // Returns the user payload from the validated JWT token
  }
}
