import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcryptjs'; // Import bcryptjs

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Find a user by username
  async findByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  // Create a new user (signup)
  async createUser(userData: any): Promise<User> {
    const saltRounds = 10; // Salt rounds for bcrypt hashing
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds); // Hash the password

    const newUser = new this.userModel({
      ...userData,
      password: hashedPassword, // Save the hashed password instead of the plain password
    });
    return newUser.save();
  }
}
