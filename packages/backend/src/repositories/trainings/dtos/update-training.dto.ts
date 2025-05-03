import { Transform } from 'class-transformer';
import { IsDateString, IsOptional, IsString } from 'class-validator';
import { TransformDateString } from 'src/common/pipes/parse-date-string.pipe';

export class UpdateTrainingDto {
  @IsOptional()
  @IsString()
  staff_id?: string;

  @IsDateString()
  @IsOptional()
  date_of_begin?: string;

  @IsDateString()
  @IsOptional()
  @Transform(({ value }) => TransformDateString(value))
  date_of_end?: string;
}
