import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsLaterDate } from 'src/common/validators/is-later-date.validator';

export class UpdateAbonementDto {
  @IsDateString()
  @IsOptional()
  start_date?: string;

  @IsDateString()
  @IsOptional()
  @IsLaterDate('start_date')
  end_date?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsString()
  @IsOptional()
  abonement_type?: string;

  @IsInt()
  @IsOptional()
  department_id?: number;
}
