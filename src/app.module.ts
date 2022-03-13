import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import winston from 'winston/lib/winston/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user.module';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

@Module({
  imports: [
    WinstonModule.forRoot({
      level: 'info',
      format: format.combine(
        format.timestamp({ format: 'isoDateTime' }),
        format.ms(),
        nestWinstonModuleUtilities.format.nestLike('my app', {
          prettyPrint: true,
        }),
        format.colorize({ all: true }),
      ),
      transports: [
        new transports.Console(),
        new transports.File({ filename: 'error.log', level: 'error' }),
      ],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
