import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { TransformDateString } from 'src/common/pipes/parse-date-string.pipe';
import { IsLaterDate } from 'src/common/validators/is-later-date.validator';

export class CreateTrainingDto {
  @IsNotEmpty()
  @IsString()
  visitor_id: string;

  @IsNotEmpty()
  @IsString()
  staff_id: string;

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
