import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactInfoDto } from './dto/create-contact-info.dto';
import { UpdateContactInfoDto } from './dto/update-contact-info.dto';
import { ContactInfo } from './entities/contact-info.entity';

@Injectable()
export class ContactInfoService {
  constructor(
    @InjectRepository(ContactInfo)
    private contactInfoRepository: Repository<ContactInfo>,
  ) {}

  async create(createContactInfoDto: CreateContactInfoDto) {
    try {
      const contactInfo =
        this.contactInfoRepository.create(createContactInfoDto);
      return await this.contactInfoRepository.save(contactInfo);
    } catch (err: any) {
      switch (err.code) {
        case 'ER_DUP_ENTRY':
          throw new HttpException(
            `${err.code}`,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
      }
    }
  }

  findAll() {
    return this.contactInfoRepository.find({ relations: ['employee'] });
  }

  async findOne(id: number) {
    try {
      const contactInfo = await this.contactInfoRepository.findOneOrFail(id);
      return contactInfo;
    } catch (err) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateContactInfoDto: UpdateContactInfoDto) {
    let updateContactInfo = await this.findOne(id);

    try {
      return await this.contactInfoRepository.save({
        ...updateContactInfo,
        ...updateContactInfoDto,
      });
    } catch (err) {
      switch (err.code) {
        case 'ER_DUP_ENTRY':
          throw new HttpException(
            `${err.code}`,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );

        case 'ER_NO_REFERENCED_ROW_2':
          throw new HttpException(
            `${err.code}`,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
      }
    }
  }

  async remove(id: number) {
    const contactInfo = await this.findOne(id);
    return this.contactInfoRepository.remove(contactInfo);
  }
}
