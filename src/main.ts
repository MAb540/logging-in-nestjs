import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NestjsWinstonLoggerService } from 'nestjs-winston-logger';
import { format, transports } from 'winston';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalLogger = new NestjsWinstonLoggerService({
    format: format.combine(
      format.timestamp({ format: 'isoDateTime' }),
      format.json(),
      format.colorize({ all: true }),
    ),
    transports: [new transports.Console()],
  });
  await app.listen(3000);
}
bootstrap();
