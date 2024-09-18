import * as dotenv from 'dotenv';
import { join } from 'path';

// Load .env file from the root folder
dotenv.config({ path: join(__dirname, '..', '.env') });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.BACKEND_PORT;
  await app.listen(port, () => console.log(`Server running on port ${port}`));
}
bootstrap();
