import { Injectable } from '@nestjs/common';
import { hostname } from 'node:os';
import { Feeding } from '../generated/prisma/client';
import { FeedingSource, PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FeedingsService {
  constructor(private readonly prisma: PrismaService) {}

  record(source: FeedingSource): Promise<Feeding> {
    return this.prisma.feeding.create({
      data: { source, instance: hostname() },
    });
  }

  list(limit: number): Promise<Feeding[]> {
    return this.prisma.feeding.findMany({
      orderBy: [{ fedAt: 'desc' }, { id: 'desc' }],
      take: limit,
    });
  }
}
