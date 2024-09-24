import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './api/article/article.module'; 
import { AppController } from './app.controller';
import { AuthModule } from './api/auth/auth.module'; 
import { UserModule } from './api/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI),
    ArticlesModule, 
    AuthModule,
    UserModule, 
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
