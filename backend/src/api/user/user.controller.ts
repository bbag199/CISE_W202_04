import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Fetch a user by username
  @Get(':username')
  async getUserByUsername(@Param('username') username: string): Promise<User> {
    return this.userService.findByUsername(username);
  }

  // (Optional) Add other user management routes here
}
