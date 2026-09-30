import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { Redis } from 'ioredis';
import { ServerOptions } from 'socket.io';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  async connectToRedis() {
    const pub = new Redis({
      host: process.env.REDIS_HOST ?? 'localhost', // same as BullModule.forRoot
      port: 6379,
      lazyConnect: true, // connect explicitly below so boot fails fast if Redis is down
    });
    const sub = pub.duplicate();            // a subscribed client cannot run other commands
    await Promise.all([pub.connect(), sub.connect()]);
    this.adapterConstructor = createAdapter(pub, sub);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}