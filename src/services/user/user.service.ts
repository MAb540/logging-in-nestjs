import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  findAllUsers(): string {
    this.logger.log('findAllUsers has been called');
    this.logger.error('the error is thrown from nest js');
    this.logger.debug('the debug is thrown  from nest');

    this.logger.verbose('this is some verbose');

    return 'this is some logging';
  }
}
