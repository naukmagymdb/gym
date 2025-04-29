import { IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';

export class UpdateSupplierDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber()
  phone_num: string;
}
