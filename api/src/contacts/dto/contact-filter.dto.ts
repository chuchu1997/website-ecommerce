import {
  IsOptional,
  IsBoolean,
  IsNumber,
  IsString,
  IsArray,
} from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * DTO for order filter parameters
 */
export class ContactQueryFilterDto {
  @IsNumber()
  @Transform(({ value }) =>
    value !== undefined ? parseInt(value, 10) : undefined,
  )
  storeID: number;

  @IsNumber()
  @Transform(({ value }) =>
    value !== undefined ? parseInt(value, 10) : undefined,
  )
  currentPage: number;

  @IsNumber()
  @Transform(({ value }) =>
    value !== undefined ? parseInt(value, 10) : undefined,
  )
  limit: number;
}
