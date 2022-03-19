import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeService } from 'src/employee/employee.service';
import { Employee } from 'src/employee/entities/employee.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,

    private readonly employeesService: EmployeeService,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const { name, employeeId: managerId } = createTaskDto;

    try {
      const task = this.taskRepository.create({ name: name });
      await this.taskRepository.save(task);

      let manager = await this.employeesService.AddTaskToEmployee(
        managerId,
        task,
      );

      return { manager };
    } catch (err: any) {
      switch (err.code) {
        case 'ER_DUP_ENTRY':
          throw new HttpException(
            `${err.code}`,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        default:
          throw new HttpException(`${err}`, HttpStatus.NOT_FOUND);
      }
    }
  }

  findAll() {
    return this.taskRepository.find({ relations: ['employee'] });
  }

  async findOne(taskId: number) {
    try {
      const task = await this.taskRepository.findOneOrFail(
        { id: taskId },
        { relations: ['employee'] },
      );
      return task;
    } catch (err) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async update(taskId: number, updateTaskDto: UpdateTaskDto) {
    let task = await this.findOne(taskId);

    try {
      return await this.taskRepository.save({
        ...task,
        ...updateTaskDto,
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

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
