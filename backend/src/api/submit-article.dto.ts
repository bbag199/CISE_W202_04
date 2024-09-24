/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsArray, IsOptional, IsNumber, Min, Max } from 'class-validator';

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

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;
}
