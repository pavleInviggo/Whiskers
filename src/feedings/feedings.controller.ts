import { Controller, DefaultValuePipe, Get, Post, ParseIntPipe, Query } from '@nestjs/common';
import { FeedingsService } from './feedings.service';


@Controller()
export class FeedingsController {
    constructor(private readonly feedingsService: FeedingsService) {}

    @Get('feedings')
    list(@Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number) {
      return this.feedingsService.list(Math.min(Math.max(limit, 1), 100));
    }

    @Post('treats')
    treat(){
      return this.feedingsService.record('manual');
    }
}