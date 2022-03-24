import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';

// can be used to set for different environments
const env = process.env.NODE_ENV || 'dev';
const dotenv_path = path.resolve(process.cwd(), `.env`); //.${env}
const result = dotenv.config({ path: dotenv_path });
if (result.error) {
  /* do nothing */
}

let devOrmConfig: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  database: process.env.POSTGRES_DEV_DB,
  host: process.env.POSTGRES_DEV_HOST,
  port: parseInt(process.env.POSTGRES_DEV_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  autoLoadEntities: true,
  logging: false,
  migrationsRun: false,
  synchronize: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

if (process.env.BACKEND_ENV === 'production') {
  const prodOrmConfig = {
    ...devOrmConfig,
    database: process.env.POSTGRES_PROD_DB,
    host: process.env.POSTGRES_PROD_HOST,
    port: parseInt(process.env.POSTGRES_PROD_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    migrationsRun: true,
  };
  devOrmConfig = prodOrmConfig;
}
export default devOrmConfig;
