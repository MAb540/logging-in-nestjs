import { IsEmail, IsInt, IsString } from 'class-validator';
import { Employee } from 'src/employee/entities/employee.entity';

export class CreateContactInfoDto {
  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsInt()
  employee: Employee;
}
