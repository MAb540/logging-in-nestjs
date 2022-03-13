import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class UserService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  findAllUsers(): string {
    // this.logger.log('findAllUsers has been called');
    this.logger.info('findAllUsers has been called');
    this.logger.error('the error is thrown from nest js');
    this.logger.debug('the debug is thrown  from nest');

    this.logger.verbose('this is some verbose');

    return 'this is some logging';
  }
}
