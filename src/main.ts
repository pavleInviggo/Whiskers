import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './ws/redis-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const adapter = new RedisIoAdapter(app);
  await adapter.connectToRedis();
  app.useWebSocketAdapter(adapter);
  
  app.enableShutdownHooks(); // run onModuleDestroy (e.g. Prisma $disconnect) on SIGTERM
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
