import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query } from '@nestjs/common';
import { FeedingsService } from './feedings.service';


@Controller('feedings')
export class FeedingsController {
    constructor(private readonly feedingsService: FeedingsService) {}

    @Get()
    list(@Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number) {
      return this.feedingsService.list(Math.min(Math.max(limit, 1), 100));
    }
}