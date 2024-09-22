import { Controller, Get, Query, Post, Body, Param, Put, Delete } from '@nestjs/common';
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

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Article> {
    return this.articlesService.findOne(id);
  }

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articlesService.create(createArticleDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articlesService.update(id, createArticleDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Article> {
    return this.articlesService.delete(id);
  }

  @Get('search')
  async searchByTitle(@Query('title') title: string) {
    return this.articlesService.searchByTitle(title);
  }

  @Get('status/unmoderated')
  async findUnmoderatedArticles(): Promise<Article[]> {
    return this.articlesService.findByStatus('Unmoderated');
}
}
