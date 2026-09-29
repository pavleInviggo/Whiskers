import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhoamiController } from './whoami/whoami.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';
import { FeedingsModule } from './feedings/feedings.module';
import { FeederModule } from './feeder/feeder.module';

@Module({
  imports: [ScheduleModule.forRoot(), PrismaModule, FeedingsModule, FeederModule],
  controllers: [AppController, WhoamiController],
  providers: [AppService],
})
export class AppModule {}
