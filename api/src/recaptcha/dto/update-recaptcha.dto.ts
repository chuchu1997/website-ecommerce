import { PartialType } from '@nestjs/swagger';
import { CreateRecaptchaDto } from './create-recaptcha.dto';

export class UpdateRecaptchaDto extends PartialType(CreateRecaptchaDto) {}
