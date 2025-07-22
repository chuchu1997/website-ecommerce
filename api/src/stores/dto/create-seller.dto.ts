import { IsEmail, IsInt, IsString, MinLength } from 'class-validator';

export class CreateSellerWithStoreDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsString()
  name: string;

  @IsInt()
  storeId: number;
}
