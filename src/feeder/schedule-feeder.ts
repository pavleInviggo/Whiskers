import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FeedingsService } from '../feedings/feedings.service';

@Injectable()
export class ScheduleFeeder {
  private readonly logger = new Logger(ScheduleFeeder.name);

  constructor(private readonly feedingsService: FeedingsService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async feed() {
    const row = await this.feedingsService.record('nestjs/schedule');
    this.logger.log(`fed Whiskers (#${row.id}) from ${row.instance}`);
  }
}
