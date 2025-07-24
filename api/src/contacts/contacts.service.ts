import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/prisma.service';
import { EmailService } from 'src/utils/email.service';
import { ContactQueryFilterDto } from './dto/contact-filter.dto';

@Injectable()
export class ContactsService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}
  async create(createContactDto: CreateContactDto) {
    // await this.emailService.sendMail('', '', '');
    // this.prisma.con
    try {
      let contact = await this.prisma.contact.create({
        data: createContactDto,
      });
      return contact;
    } catch (err) {
      console.log('ERR', err);
    }

    // await this.emailService.sendMail("",contact.subject,"")
  }

  async findAll(query: ContactQueryFilterDto) {
    const { limit, currentPage, storeID } = query;
    return await this.prisma.contact.findMany({
      where: {
        storeId: storeID,
      },
      take: limit ?? undefined,
      skip: (currentPage - 1) * limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.contact.findUnique({
      where: {
        id,
      },
    });
  }
  async totalContacts() {
    return await this.prisma.contact.count();
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
