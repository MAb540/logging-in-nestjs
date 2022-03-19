import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsInt, IsString } from 'class-validator';
import { Employee } from 'src/employee/entities/employee.entity';
import { CreateMeetingDto } from './create-meeting.dto';

export class UpdateMeetingDto extends PartialType(CreateMeetingDto) {

    @IsString()
    zoomUrl:string;


    @IsInt()
    attendee:number

}
