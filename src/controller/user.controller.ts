import { Controller, Get } from '@nestjs/common';
import { Test } from 'src/models/test.entity';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  findAllUsers(): Promise<Test[]> {
    return this.userService.findAllUsers();
  }
}
