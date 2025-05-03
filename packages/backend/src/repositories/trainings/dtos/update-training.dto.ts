import { Transform } from 'class-transformer';
import { IsDateString, IsInt, IsOptional } from 'class-validator';
import { TransformDateString } from 'src/common/pipes/parse-date-string.pipe';

export class UpdateTrainingDto {
  @IsOptional()
  @IsInt()
  staff_id?: number;

  @IsDateString()
  @IsOptional()
  date_of_begin?: string;

  @IsDateString()
  @IsOptional()
  @Transform(({ value }) => TransformDateString(value))
  date_of_end?: string;
}
