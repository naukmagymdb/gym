import {
  IsDateString,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class TrainingQueryDto {
  @IsOptional()
  @IsInt()
  visitor_id?: number;

  @IsOptional()
  @IsInt()
  staff_id?: number;

  @IsOptional()
  @IsDateString()
  date_of_begin?: string;

  @IsOptional()
  @IsDateString()
  date_of_end?: string;
}

export class SortOptionsDto {
  @IsOptional()
  @IsString()
  @IsIn(['visitor_id', 'staff_id', 'date_of_begin', 'date_of_end'])
  sortBy: string = 'visitor_id';

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  order: string = 'asc';
}
