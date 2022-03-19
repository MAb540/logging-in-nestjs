import { IsArray, IsInt, IsString } from "class-validator";
import { Employee } from "src/employee/entities/employee.entity";

export class CreateMeetingDto {

    @IsString()
    zoomUrl:string;


    @IsInt()
    attendee:number

}
