import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ValidationPipe } from 'src/Validation/validation.pipe';
import { ContactInfoService } from './contact-info.service';
import { CreateContactInfoDto } from './dto/create-contact-info.dto';
import { UpdateContactInfoDto } from './dto/update-contact-info.dto';

@Controller('contact-info')
export class ContactInfoController {
  constructor(private readonly contactInfoService: ContactInfoService) {}

  @Post()
  create(@Body(new ValidationPipe()) createContactInfoDto: CreateContactInfoDto) {

    return this.contactInfoService.create(createContactInfoDto);
  }

  @Get()
  findAll() {
    return this.contactInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number) {
    return this.contactInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id',new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number, @Body() updateContactInfoDto: UpdateContactInfoDto) {
    return this.contactInfoService.update(+id, updateContactInfoDto);
  }

  @Delete(':id')
  remove(@Param('id',new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number) {
    return this.contactInfoService.remove(+id);
  }
}
