import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsString } from 'class-validator';
import { Employee } from 'src/employee/entities/employee.entity';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) 
{    

    @IsString()
    name: string;

    @IsInt()
    employee:Employee;

}
