import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateStaffDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  contract_num?: string = null;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  staff_name?: string = null;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  surname?: string = null;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  patronymic?: string = null;

  @IsString()
  @IsOptional()
  salary?: string = null;

  //   @IsPhoneNumber()
  @IsOptional()
  @MaxLength(50)
  phone_num?: string = null;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  qualification_cert_number_of_coach?: string = null;

  @IsEmail()
  @IsOptional()
  email?: string = null;

  @IsString()
  @IsOptional()
  department_id?: string = null;

  @IsString()
  @IsOptional()
  // @Exclude()
  login_password?: string = null;
}
