import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './article.schema';
import { CreateArticleDto } from './submit-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

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

  async addRating(id: string, newRating: number): Promise<Article> {
    const article = await this.articleModel.findById(id);
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    article.rating.push(newRating); // Add new rating to the array
    await article.save();
    return article;
  }

  async update(
    id: string,
    createArticleDto: CreateArticleDto,
  ): Promise<Article> {
    return await this.articleModel
      .findByIdAndUpdate(id, createArticleDto, { new: true })
      .exec();
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
