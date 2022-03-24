import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Test } from 'src/models/test.entity';
import { Repository } from 'typeorm';
import { Logger } from 'winston';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Test) private testRepo: Repository<Test>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private configService: ConfigService,
  ) {}

  async findAllUsers(): Promise<Test[]> {
    // this.logger.log('findAllUsers has been called');
    this.logger.info('findAllUsers has been called');

    console.log(process.env.BACKEND_ENV);

    // const records = await this.testRepo.find();

    // await this.testRepo.save({
    //   name: 'myab',
    //   age: 23,
    // });
    // return 'some testing';
    return this.testRepo.find();
  }
}
