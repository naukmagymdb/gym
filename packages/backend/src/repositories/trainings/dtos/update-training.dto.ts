import { IsDateString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { IsLaterDate } from 'src/common/validators/is-later-date.validator';

export class UpdateTrainingDto {
  constructor(partial: Partial<UpdateTrainingDto>) {
    Object.assign(this, partial);
  }

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
