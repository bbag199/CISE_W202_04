import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './article.schema';
import { CreateArticleDto } from './submit-article.dto';

@Injectable()
export class ArticlesService {
    constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  test(): string {
    return 'article route testing';
  }

  async findAll(): Promise<Article[]> {
    return await this.articleModel.find().exec();
  }

  async findOne(id: string): Promise<Article> {
    return await this.articleModel.findById(id).exec();
  }

  // possible findOne code to only allow access to certain article statuses -Cam
  //
  // async findOne(id: string, context: 'moderate' | 'browse' = 'browse'): Promise<Article | null> {
  //   const article = await this.articleModel.findById(id).exec();
  //   if (context === 'moderate' && article && article.status !== 'Unmoderated') {
  //     return null; // Return null if the article is not unmoderated in moderation context
  //   }
  //    // could add similar functionality for the browse & analyse contexts
  //   return article; // Return the article for all other contexts
  // }

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    return await this.articleModel.create(createArticleDto); 
  }

  async update(id: string, createArticleDto: CreateArticleDto): Promise<Article> {
    return await this.articleModel.findByIdAndUpdate(id, createArticleDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Article> {
    const deletedArticle = await this.articleModel.findByIdAndDelete(id).exec();
    return deletedArticle;
  }

  async searchByTitle(title: string): Promise<Article[]> {
    const query = { title: { $regex: title, $options: 'i' } };
  
    return this.articleModel.find(query).exec();
  }
  

  async findByStatus(statusToSearch: string): Promise<Article[]> {
    return this.articleModel.find({ status: statusToSearch }).exec();
  }

}
