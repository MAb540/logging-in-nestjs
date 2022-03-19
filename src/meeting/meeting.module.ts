import { Module } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { MeetingController } from './meeting.controller';
import { Meeting } from './entities/meeting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
  imports:[TypeOrmModule.forFeature([Meeting]),
  EmployeeModule],
  controllers: [MeetingController],
  providers: [MeetingService]
})
export class MeetingModule {}
