import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty()
  @IsString()
  edrpou: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  // @IsPhoneNumber()
  phone_num: string;
}
