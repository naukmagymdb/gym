import { IsEmail, IsOptional } from 'class-validator';

export class UpdateSupplierDto {
  @IsOptional()
  @IsEmail()
  email?: string | null;

  @IsOptional()
  // @IsPhoneNumber()
  phone_num?: string | null;
}
