import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { UserModule } from './modules/user.module';
import { HttpRequestLogger } from './middlewares/HttpLogging.middleware';
import { loggingConfigObj } from './configs/generalConfigs';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './configs/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRoot(loggingConfigObj),
    TypeOrmModule.forRoot(ormConfig),
    UserModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpRequestLogger).forRoutes('*');
  }
}
