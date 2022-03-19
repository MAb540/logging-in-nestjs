import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactInfoModule } from 'src/contact-info/contact-info.module';
import { EmployeeModule } from 'src/employee/employee.module';
import { MeetingModule } from 'src/meeting/meeting.module';
import { TaskModule } from 'src/task/task.module';
import { UsersModule } from 'src/users/users.module';
import { Connection, getConnectionOptions } from 'typeorm';
import config from '../../ormconfig';


// type: 'mysql',
// host: 'localhost',
// port: 3306,
// username: 'root',
// password: 'messi',
// database: 'test',
// // autoLoadEntities:true,
// synchronize: true

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UsersModule,
    EmployeeModule,
    ContactInfoModule,
    TaskModule,
    MeetingModule

  ],

})
export class AppModule {
  constructor(private connection: Connection){
    // TypeOrmModule.forRootAsync({
    //   useFactory: async () =>
    //     Object.assign(await getConnectionOptions(), {
    //       autoLoadEntities: true,
    //     }),
    // });
  }
}
