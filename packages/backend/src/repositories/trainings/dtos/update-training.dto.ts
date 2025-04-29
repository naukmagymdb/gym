import { IsDateString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTrainingDto {
  constructor(partial: Partial<UpdateTrainingDto>) {
    Object.assign(this, partial);
  }

  @IsOptional()
  @IsInt()
  staffId?: number;

  @IsDateString()
  @IsNotEmpty()
  dateFrom?: string;

  @IsDateString()
  @IsNotEmpty()
  dateTo?: string;
}
