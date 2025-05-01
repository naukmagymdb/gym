import { IsDateString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { IsLaterDate } from 'src/common/validators/is-later-date.validator';

export class CreateTrainingDto {
  constructor(partial: Partial<CreateTrainingDto>) {
    Object.assign(this, partial);
  }

  @IsInt()
  @IsNotEmpty()
  visitor_id: number;

  @IsInt()
  @IsOptional()
  staff_id: number;

  @IsDateString()
  @IsNotEmpty()
  date_of_begin: string;

  @IsDateString()
  @IsNotEmpty()
  @IsLaterDate('date_of_begin')
  date_of_end: string;
}
