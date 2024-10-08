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
  rating?: number[];

  @IsString()
  @IsNotEmpty()
  journalConferenceName: string;

  @IsString()
  @IsNotEmpty()
  sePractice: string;

  @IsString()
  @IsNotEmpty()
  evidenceResult: string;

  @IsString()
  @IsNotEmpty()
  researchType: string;

  @IsString()
  @IsNotEmpty()
  participantType: string;
}
