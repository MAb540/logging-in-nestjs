import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import { UserModule } from './modules/user.module';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { HttpRequestLogger } from './middlewares/HttpLogging.middleware';

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
        // new transports.File({ filename: 'error.log', level: 'error' }),
      ],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpRequestLogger).forRoutes('*');
  }
}
