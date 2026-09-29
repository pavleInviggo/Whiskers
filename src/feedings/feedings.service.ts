import { Injectable } from '@nestjs/common';
import { hostname } from 'node:os';
import { Feeding } from '../generated/prisma/client';
import { FeedingSource, PrismaService } from '../prisma/prisma.service';
import { FeederGateway } from '../feeder/feeder.gateway';

@Injectable()
export class FeedingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gateway: FeederGateway,
  ) {}

  async record(source: FeedingSource): Promise<Feeding> {
    const feeding = await this.prisma.feeding.create({
      data: { source, instance: hostname() },
    });
    this.gateway.broadcastFeeding(feeding);
    return feeding;
  }

  list(limit: number): Promise<Feeding[]> {
    return this.prisma.feeding.findMany({
      orderBy: [{ fedAt: 'desc' }, { id: 'desc' }],
      take: limit,
    });
  }
}
