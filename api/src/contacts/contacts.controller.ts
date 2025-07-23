import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactQueryFilterDto } from './dto/contact-filter.dto';
import { RecaptchaService } from 'src/recaptcha/recaptcha.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Public()
  @Post()
  async create(@Body() createContactDto: CreateContactDto) {
    // this.reCapcha.verifyToken()
    return await this.contactsService.create(createContactDto);
  }
  @Public()
  @Get()
  async findAll(@Query() query: ContactQueryFilterDto) {
    return {
      message: 'Tìm contacts thành công ',
      contacts: await this.contactsService.findAll(query),
      totals: await this.contactsService.totalContacts(),
    };
  }
  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'Lấy contact theo id thành công ',
      contact: await this.contactsService.findOne(+id),
    };
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
  //   return this.contactsService.update(+id, updateContactDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.contactsService.remove(+id);
  // }
}
