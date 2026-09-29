import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhoamiController } from './whoami/whoami.controller';
import { PrismaModule } from './prisma/prisma.module';
import { FeedingsModule } from './feedings/feedings.module';

@Module({
  imports: [PrismaModule, FeedingsModule],
  controllers: [AppController, WhoamiController],
  providers: [AppService],
})
export class AppModule {}
