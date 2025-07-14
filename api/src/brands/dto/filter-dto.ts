import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsNumberString,
  IsNumber,
} from 'class-validator';

export class FilterBrandDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumberString()
  position?: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  storeID: number;
}
