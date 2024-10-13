import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { ArticlesService } from './article.service';
import { CreateArticleDto } from './submit-article.dto';
import { Article } from './article.schema';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('test')
  test(): string {
    return this.articlesService.test();
  }

  @Get()
  async findAll(): Promise<Article[]> {
    return this.articlesService.findAll();
  }

  @Get('search')
  async searchArticles(
    @Query('title') title: string,
    @Query('sePractice') sePractice: string,
  ): Promise<Article[]> {
    return this.articlesService.searchArticles(title, sePractice);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Article> {
    return this.articlesService.findOne(id);
  }

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articlesService.create(createArticleDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<Article> {
    return this.articlesService.update(id, createArticleDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Article> {
    return this.articlesService.delete(id);
  }

  @Get('status/unmoderated')
  async findUnmoderatedArticles(): Promise<Article[]> {
    return this.articlesService.findByStatus('Unmoderated');
  }

  @Patch(':id/rate')
  async rateArticle(
    @Param('id') id: string,
    @Body('rating') rating: number,
  ): Promise<Article> {
    return this.articlesService.addRating(id, rating);
  }

  @Patch(':id')
  updateArticle(
    @Param('id') id: string,
    @Body() updateDto: any,
  ): Promise<Article> {
    return this.articlesService.updateArticle(id, updateDto);
  }

  @Get('status/moderated')
  async findArticlesArticles(): Promise<Article[]> {
    return this.articlesService.findByStatus('Moderated');
  }

  @Get('count/:status')
  async count(@Param('status') selected_status: string): Promise<number> {
    return this.articlesService.count(selected_status);
  }
}
