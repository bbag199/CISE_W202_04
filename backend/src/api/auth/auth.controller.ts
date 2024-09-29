import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginData: { username: string; password: string },
    @Res() res: Response,
  ) {
    const { username, password } = loginData;

    try {
      // Use AuthService to authenticate and get the access token
      const { access_token } = await this.authService.login(username, password);

      // Return the access token in the response body
      return res
        .status(HttpStatus.OK)
        .json({ access_token, message: 'Login successful' });
    } catch (error) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid credentials' });
    }
  }

  @Post('signup')
  async signup(
    @Body() signupData: { username: string; password: string; email: string },
  ) {
    const { username, password, email } = signupData;
    return this.authService.signup(username, password, email);
  }

  // Protected route - accessible only with a valid JWT token
  @UseGuards(AuthGuard) // Apply the JWT Auth Guard
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // Returns the user payload from the validated JWT token
  }
}
