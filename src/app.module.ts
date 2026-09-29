import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhoamiController } from './whoami/whoami.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';
import { FeedingsModule } from './feedings/feedings.module';
import { FeederModule } from './feeder/feeder.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    BullModule.forRoot({
    connection: {
      host: process.env.REDIS_HOST ?? 'localhost', // compose sets REDIS_HOST=redis
      port: 6379,
    },
  }),
    PrismaModule, FeedingsModule, FeederModule],
  controllers: [AppController, WhoamiController],
  providers: [AppService],
})
export class AppModule {}
