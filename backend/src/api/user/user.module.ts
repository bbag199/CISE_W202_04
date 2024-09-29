import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Register User schema
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Export UserService to be used in other modules like AuthModule
})
export class UserModule {}
