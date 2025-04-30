import { IsDateString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTrainingDto {
  constructor(partial: Partial<CreateTrainingDto>) {
    Object.assign(this, partial);
  }

  @IsInt()
  @IsNotEmpty()
  visitor_id: number;

  @IsInt()
  @IsOptional()
  staff_id?: number;

  @IsDateString()
  @IsNotEmpty()
  date_of_begin: string;

  @IsDateString()
  @IsNotEmpty()
  date_of_end: string;
}
