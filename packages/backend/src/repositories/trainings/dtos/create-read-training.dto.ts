import { IsDateString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateReadTrainingDto {
  constructor(partial: Partial<CreateReadTrainingDto>) {
    Object.assign(this, partial);
  }

  @IsInt()
  @IsNotEmpty()
  visitorId: number;

  @IsInt()
  @IsOptional()
  staffId?: number;

  @IsDateString()
  @IsNotEmpty()
  dateFrom: string;

  @IsDateString()
  @IsNotEmpty()
  dateTo: string;
}
