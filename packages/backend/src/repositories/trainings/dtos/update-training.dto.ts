import { IsDateString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTrainingDto {
  @IsOptional()
  @IsInt()
  staff_id?: number;

  @IsDateString()
  @IsNotEmpty()
  date_of_begin?: string;

  @IsDateString()
  @IsNotEmpty()
  date_of_end?: string;
}
