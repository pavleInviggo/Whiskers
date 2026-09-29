import { Injectable, OnModuleInit } from "@nestjs/common";
import { FeedingsService } from "../feedings/feedings.service";
import { InjectQueue, Processor, WorkerHost } from "@nestjs/bullmq";
import {Job, Queue } from "bullmq";

@Injectable()
export class BullmqFeeder implements OnModuleInit {
  constructor(@InjectQueue('feeder') private readonly queue: Queue) {}

  async onModuleInit() {
    // runs in every replica; the same id makes it idempotent
    await this.queue.upsertJobScheduler(
      'feed-whiskers',
      { pattern: '* * * * *' },
      { name: 'feed', data: { portionGrams: 20 } },
    );
  }
}

@Processor('feeder')
export class FeederProcessor extends WorkerHost {
  constructor(private readonly feedings: FeedingsService) { super(); }

  async process(job: Job) {
    return this.feedings.record('bullmq');
  }
}