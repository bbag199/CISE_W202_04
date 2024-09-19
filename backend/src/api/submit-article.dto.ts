import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsNotEmpty()
  authors: string[];

  @IsString()
  @IsNotEmpty()
  source: string;

  @IsString()
  @IsNotEmpty()
  publicationYear: string;

  @IsString()
  @IsNotEmpty()
  doi: string;
}
