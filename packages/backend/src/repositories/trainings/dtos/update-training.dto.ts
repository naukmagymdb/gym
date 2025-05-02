import { IsDateString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { IsLaterDate } from 'src/common/validators/is-later-date.validator';

export class UpdateTrainingDto {
  @IsOptional()
  @IsInt()
  staff_id?: number;

  @IsDateString()
  @IsNotEmpty()
  date_of_begin?: string;

  @IsDateString()
  @IsNotEmpty()
  @IsLaterDate('date_of_begin')
  date_of_end?: string;
}
