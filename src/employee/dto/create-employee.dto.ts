import {IsString,IsInt, IsArray} from 'class-validator'
import { ContactInfo } from 'src/contact-info/entities/contact-info.entity';
import { Meeting } from 'src/meeting/entities/meeting.entity';
import { Task } from 'src/task/entities/task.entity';
import { Employee } from '../entities/employee.entity';

export class CreateEmployeeDto {

    @IsString()
    name:string;

    @IsInt()
    manager:Employee;

    // @IsArray()
    // directReports:Array<Employee>;

    // @IsInt()
    // contactInfo:ContactInfo;

    // @IsArray()
    // tasks: Array<Task>

    // @IsArray()
    // meetings:Array<Meeting>

}
