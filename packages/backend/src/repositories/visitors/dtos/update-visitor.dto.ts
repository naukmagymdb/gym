import { Exclude } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateVisitorDto {
  constructor(partial: Partial<UpdateVisitorDto>) {
    Object.assign(this, partial);
  }

  @IsDateString()
  @IsOptional()
  birth_date?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  visitor_name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  surname?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  patronymic?: string;

  //   @IsPhoneNumber()
  @IsOptional()
  @MaxLength(50)
  phone_num?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @Exclude()
  @IsOptional()
  login_password?: string;
}
