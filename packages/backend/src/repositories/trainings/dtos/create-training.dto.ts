import { Transform } from 'class-transformer';
import { IsDateString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { TransformDateString } from 'src/common/pipes/parse-date-string.pipe';
import { IsLaterDate } from 'src/common/validators/is-later-date.validator';

export class CreateTrainingDto {
  @IsNotEmpty()
  @IsInt()
  visitor_id: number;

  @IsOptional()
  @IsInt()
  staff_id?: number;

  @IsNotEmpty()
  @IsDateString()
  @Transform(({ value }) => TransformDateString(value))
  date_of_begin: string;

  @IsNotEmpty()
  @IsDateString()
  @IsLaterDate('date_of_begin')
  @Transform(({ value }) => TransformDateString(value))
  date_of_end: string;
}
