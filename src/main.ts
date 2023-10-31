import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

process.on('unhandledRejection', (error) => console.error((error as any).message))

bootstrap();
