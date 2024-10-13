import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get() // This handles requests to the root URL ('/')
  getHome() {
    return 'Welcome to the API. Try visiting /articles for articles data.';
  }
}
