import {  IsInt,  IsString } from "class-validator";


export class CreateTaskDto {


    @IsString()
    name: string;

    @IsInt()
    employeeId:number;

}
