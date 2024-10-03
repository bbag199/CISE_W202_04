import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  authors: string[];

  @Prop({ required: true })
  source: string;

  @Prop({ required: true })
  publicationYear: string;

  @Prop({ required: true })
  doi: string;

  @Prop({ default: 'Unmoderated' })
  status: string;

  @Prop({ type: [String], default: [] })
  claim: string[];

  @Prop({ default: [] })
  evidence: string[];

  @Prop({ required: true, default: [] })
  rating: number[];
}

export const ArticleSchema = SchemaFactory.createForClass(Article);