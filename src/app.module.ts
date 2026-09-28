import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhoamiController } from './whoami/whoami.controller';

@Module({
  imports: [],
  controllers: [AppController, WhoamiController],
  providers: [AppService],
})
export class AppModule {}
