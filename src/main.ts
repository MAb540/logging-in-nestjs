import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.set('trust proxy', function (ip: string) {
  //   if (ip === '127.0.0.1') return true;
  //   // trusted IPs
  //   else return false;
  // });

  await app.listen(3000);
}
bootstrap();
