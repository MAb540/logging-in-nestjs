import { Controller, Get } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  findAllUsers(): string {
    return this.userService.findAllUsers();
  }
}
