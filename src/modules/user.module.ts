import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controller/user.controller';
import { Test } from 'src/models/test.entity';
import { UserService } from 'src/services/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Test])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
