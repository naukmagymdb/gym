import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class TrainingLookupDto {
  constructor(partial: Partial<TrainingLookupDto>) {
    Object.assign(this, partial);
  }

  @IsInt()
  @IsNotEmpty()
  visitor_id: number;

  @IsInt()
  @IsNotEmpty()
  staff_id: number;

  @IsDateString()
  @IsNotEmpty()
  date_of_begin: string;

  @IsDateString()
  @IsNotEmpty()
  date_of_end: string;
}
