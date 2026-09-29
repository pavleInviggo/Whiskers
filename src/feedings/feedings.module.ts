import { Module } from '@nestjs/common';
import { FeedingsService } from './feedings.service';
import { FeedingsController } from './feedings.controller';
import { FeederGateway } from '../feeder/feeder.gateway';

@Module({
  providers: [FeedingsService, FeederGateway],
  exports: [FeedingsService], // so the feeder modules (schedule, bullmq) can inject it
  controllers: [FeedingsController],
})
export class FeedingsModule {}
