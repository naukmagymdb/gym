import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { IsLaterDate } from 'src/common/validators/is-later-date.validator';

export class CreateAbonementDto {
  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @IsDateString()
  @IsNotEmpty()
  @IsLaterDate('start_date')
  end_date: string;

  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;

  @IsInt()
  @IsNotEmpty()
  visitor_id: number;

  @IsString()
  @IsNotEmpty()
  abonement_type: string;

  @IsInt()
  @IsNotEmpty()
  department_id: number;
}
