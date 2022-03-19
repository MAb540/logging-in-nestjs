import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAllUsers(): Promise<User[]> {
    return this.userRepository.find({
      relations:['books']
    });
  }

  async findUserById(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail(id);
      return user;
    } catch (err) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async createUser(name: string): Promise<User> {
    const newUser = this.userRepository.create({ name });
    return this.userRepository.save(newUser);
  }

  async updateUser(id:number,name:string): Promise<User> {
      const user = await this.findUserById(id);
      user.name = name;
      return this.userRepository.save(user);
  }

  async deleteUser(id:number): Promise<User> {
    const user = await this.findUserById(id);
    return this.userRepository.remove(user);
  }

  // customQuery():any{
  //   return this.userRepository.createQueryBuilder('user').select('name');
  // }

}


