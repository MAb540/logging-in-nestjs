import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { UserModule } from './modules/user.module';
import { HttpRequestLogger } from './middlewares/HttpLogging.middleware';
import { loggingConfigObj } from './configs/generalConfigs';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './configs/typeorm.config';

/*
   This approach can be used to configure typeOrm as well.
   This approach is a way to configure typeOrm using a nest specific configuration service but it will not work when using migrations,
   because typeorm can not locate the path of PostgresConfigService file
 */
// TypeOrmModule.forRootAsync({
//   useClass: PostgresConfigService,
//   inject: [PostgresConfigService],
// })
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
