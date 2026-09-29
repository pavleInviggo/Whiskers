import { Module } from '@nestjs/common';
import { FeedingsService } from './feedings.service';
import { FeedingsController } from './feedings.controller';

@Module({
  providers: [FeedingsService],
  exports: [FeedingsService], // so the feeder modules (schedule, bullmq) can inject it
  controllers: [FeedingsController],
})
export class FeedingsModule {}
