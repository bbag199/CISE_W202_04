import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './api/article.module'; 
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI),
    ArticlesModule, 
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
