import { Module } from '@nestjs/common';
import { FeedingsModule } from '../feedings/feedings.module';
import { ScheduleFeeder } from './schedule-feeder';

@Module({
  imports: [FeedingsModule], // provides FeedingsService for the feeders
  providers: [ScheduleFeeder],
})
export class FeederModule {}
