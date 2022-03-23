import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { UserModule } from './modules/user.module';
import { HttpRequestLogger } from './middlewares/HttpLogging.middleware';
import { loggingConfigObj } from './configs/generalConfigs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from './configs/typeorm.config';
import { getConnectionOptions } from 'typeorm';

@Module({
  imports: [
    WinstonModule.forRoot(loggingConfigObj),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        });
      },
    }),
    UserModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpRequestLogger).forRoutes('*');
  }
}
