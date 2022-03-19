import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeService } from 'src/employee/employee.service';
import { Repository } from 'typeorm';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { Meeting } from './entities/meeting.entity';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(Meeting)
    private meetingRepository: Repository<Meeting>,

    private readonly employeesService: EmployeeService,
  ) {}
  
  async addToExistingMeeting(addmeetingDto: any) {

    let {meetingId,employeeId} = addmeetingDto;
   
    let meeting = await this.meetingRepository.findOne(meetingId);
    let member = await this.employeesService.findOne(employeeId);

    

    // meeting.attendees = [...meeting.attendees,member];

    // await this.meetingRepository.save(meeting);
    // return meeting;
  }

  async create(createMeetingDto: CreateMeetingDto) {
    let { zoomUrl, attendee } = createMeetingDto;
    const meeting = this.meetingRepository.create({ zoomUrl: zoomUrl });

    let member = await this.employeesService.findOne(attendee);

    meeting.attendees = [member];
    await this.meetingRepository.save(meeting);

    return meeting;
  }

  async findAll() {
    return await this.meetingRepository.find({ relations: ['attendees'] });
  }

  async findOne(meetingId: number) {
    try {
      const meeting = await this.meetingRepository.findOneOrFail(
        { id: meetingId },
        { relations: ['attendees'] },
      );
      return meeting;
    } catch (err) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async update(meetingId: number, updateMeetingDto: UpdateMeetingDto) {
    let { zoomUrl, attendee } = updateMeetingDto;

    let members = [];
    let member = await this.employeesService.findOne(attendee);
    members.push(member);

    let meetingObj = { zoomUrl, attendees: members };

    let meeting = await this.findOne(meetingId);
    try {
      return await this.meetingRepository.save({
        ...meeting,
        ...meetingObj,
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
    return `This action removes a #${id} meeting`;
  }
}
