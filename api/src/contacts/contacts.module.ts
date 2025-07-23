import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { PrismaService } from 'src/prisma.service';
import { EmailService } from 'src/utils/email.service';
import { RecaptchaService } from 'src/recaptcha/recaptcha.service';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService, PrismaService, EmailService, RecaptchaService],
})
export class ContactsModule {}
