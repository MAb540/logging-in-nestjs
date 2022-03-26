import { Controller, Get } from '@nestjs/common';
import { User } from 'src/models/user.entity';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }
}
