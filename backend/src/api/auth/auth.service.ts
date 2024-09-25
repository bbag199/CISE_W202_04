import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'; // Import bcryptjs

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  // validate user by checking username and password
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // login function (basic session or basic auth)
  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return user;
  }

  // signup function to create a new user
  async signup(username: string, password: string, email: string) {
    return this.userService.createUser({ username, password, email });
  }
}
