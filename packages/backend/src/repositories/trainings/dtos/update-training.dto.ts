import { IsDateString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

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
  date_of_end?: string;
}
