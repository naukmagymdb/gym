import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class TrainingLookupDto {
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
