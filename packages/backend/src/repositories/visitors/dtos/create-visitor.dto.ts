import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateVisitorDto {
  constructor(partial: Partial<CreateVisitorDto>) {
    Object.assign(this, partial);
  }

  @IsDateString()
  @IsNotEmpty()
  birth_date: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  visitor_name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  surname: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  patronymic: string;

  // @IsPhoneNumber()
  @IsNotEmpty()
  @MaxLength(50)
  phone_num: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNotEmpty()
  @IsString()
  login_password: string;
}
