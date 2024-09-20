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
    try {
      return await this.articleModel.find({ title: { $regex: title, $options: 'i' } }).exec();
    } catch (error) {
      console.error('Error in searchByTitle:', error);
      throw new Error('Failed to search articles by title');
    }
  }

  async findByStatus(statusToSearch: string): Promise<Article[]> {
    return this.articleModel.find({ status: statusToSearch }).exec();
  }

}
