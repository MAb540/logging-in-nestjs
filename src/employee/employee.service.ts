import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    console.log(createEmployeeDto);

    const employee = this.employeeRepository.create(createEmployeeDto);
    return await this.employeeRepository.save(employee);
  }

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find({
      relations: ['manager'],
    });
  }

  async findOne(id: number): Promise<Employee> {
    // try {
    //   const employee = await this.employeeRepository.findOneOrFail(id, {
    //     relations: ['manager','directReports','tasks','contactInfo','meetings'],
    //   });
    //   return employee;
    // } catch (err) {
    //   throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    // }

    try{

      let emp = this.employeeRepository.createQueryBuilder('employee')
      .leftJoinAndSelect('employee.tasks','tasks')
      .leftJoinAndSelect('employee.meetings','meetings')
      .where('employee.id = :employeeId',{employeeId:id})
      .getOne();
      return emp;

    }catch(err){
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    let employee = await this.findOne(id);

    try {
      return await this.employeeRepository.save({
        ...employee,
        ...updateEmployeeDto,
      });
    } catch (err) {
      switch (err.code) {
        case 'ER_NO_REFERENCED_ROW_2':
          throw new HttpException(
            `${err.code}`,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
      }
    }
  }

  async remove(id: number): Promise<Employee> {
    const employee = await this.findOne(id);
    return this.employeeRepository.remove(employee);
  }

  async AddTaskToEmployee(managerId: number, task: Task) {
    let manager = await this.findOne(managerId);
    manager.tasks = [task];

    return this.employeeRepository.save(manager);
  }

  

}
