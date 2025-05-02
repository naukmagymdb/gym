import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateDepartmentDto {
  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  phone_numbers?: string[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsEmail({}, { each: true })
  emails?: string[];
}
