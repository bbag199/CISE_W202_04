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

      // Set the access token as an HTTP-only cookie
      res.cookie('access_token', access_token, {
        httpOnly: true, // The cookie cannot be accessed via JavaScript
        secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
        maxAge: 3600000, // 1 hour expiration time
        sameSite: 'strict', // Helps protect against CSRF
      });

      // Send a success response
      return res.status(HttpStatus.OK).json({ message: 'Login successful' });
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
