import { Module } from '@nestjs/common';
import { ContactInfoService } from './contact-info.service';
import { ContactInfoController } from './contact-info.controller';
import { ContactInfo } from './entities/contact-info.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([ContactInfo])],
  controllers: [ContactInfoController],
  providers: [ContactInfoService]
})
export class ContactInfoModule {}
