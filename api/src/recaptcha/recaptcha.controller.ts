import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecaptchaService } from './recaptcha.service';
import { CreateRecaptchaDto } from './dto/create-recaptcha.dto';
import { UpdateRecaptchaDto } from './dto/update-recaptcha.dto';

@Controller('recaptcha')
export class RecaptchaController {
  constructor(private readonly recaptchaService: RecaptchaService) {}

  @Post('verify')
  async verifyCaptcha(@Body('token') token: string) {
    const isHuman = await this.recaptchaService.verifyToken(token);
    return { success: isHuman };
  }
}
