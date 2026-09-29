import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Global so any module (feedings, feeder, ...) can inject PrismaService without importing this module.
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
