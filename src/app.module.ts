import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import winston from 'winston/lib/winston/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      useFactory: () => ({
        level: 'info',
        format: format.combine(
          format.timestamp({ format: 'isoDateTime' }),
          format.json(),
          format.colorize({ all: true }),
        ),
        transports: [
          new transports.Console(),
          new transports.File({ filename: 'error.log', level: 'error' }),
        ],
      }),
      inject: [],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
