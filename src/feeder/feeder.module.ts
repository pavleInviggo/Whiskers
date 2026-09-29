import { Module } from '@nestjs/common';
import { FeedingsModule } from '../feedings/feedings.module';
import { ScheduleFeeder } from './schedule-feeder';
import { BullModule } from '@nestjs/bullmq';
import { BullmqFeeder, FeederProcessor } from './bullmq-feeder';

@Module({
  imports: [FeedingsModule, BullModule.registerQueue({ name: 'feeder' })], 
  providers: [ScheduleFeeder, BullmqFeeder, FeederProcessor],
})
export class FeederModule {}
