import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

 const config: MysqlConnectionOptions = {

        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'messi',
        database: 'test',
        entities: ['dist/src/**/*.entity.js'],
        synchronize: false,
        migrations:[
                'dist/src/db/migrations/*.js'
        ],
        cli:{
                migrationsDir:'src/db/migrations'
        }
    
}

export default config;