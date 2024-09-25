import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcryptjs'; 

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Find a user by username
  async findByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  // Create a new user (signup)
  async createUser(userData: any): Promise<User> {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const newUser = new this.userModel({
      ...userData,
      password: hashedPassword,
    });
    return newUser.save();
  }
}
