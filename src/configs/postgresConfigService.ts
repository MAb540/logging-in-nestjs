import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const devConfig = {
      name: 'default',
      type: 'postgres' as any,
      database: this.configService.get<string>('POSTGRES_DEV_DB'),
      host: this.configService.get<string>('POSTGRES_DEV_HOST'),
      port: this.configService.get<number>('POSTGRES_DEV_PORT'),
      username: this.configService.get<string>('POSTGRES_USER'),
      password: this.configService.get<string>('POSTGRES_PASSWORD'),
      autoLoadEntities: true,
      logging: false,
      migrationsRun: false,
      synchronize: true,
      entities: [__dirname + '/models/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      cli: {
        migrationsDir: 'src/migrations',
      },
    };

    if (this.configService.get<string>('BACKEND_ENV') === 'production') {
      devConfig.database = this.configService.get<string>('POSTGRES_PROD_DB');
      devConfig.host = this.configService.get<string>('POSTGRES_PROD_HOST');
      devConfig.port = this.configService.get<number>('POSTGRES_PROD_PORT');
      devConfig.username = this.configService.get<string>('POSTGRES_USER');
      devConfig.password = this.configService.get<string>('POSTGRES_PASSWORD');
      devConfig.synchronize = false;
      devConfig.migrationsRun = true;
      return devConfig;
    }

    return devConfig;
  }
}
