import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from 'src/employee/employee.service';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
  imports:[TypeOrmModule.forFeature([Task]),
  EmployeeModule
],
  controllers: [TaskController],
  providers: [TaskService],

})
export class TaskModule {}
