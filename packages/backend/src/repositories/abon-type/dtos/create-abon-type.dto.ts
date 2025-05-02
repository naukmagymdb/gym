import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAbonTypeDto {
  @IsString()
  @IsNotEmpty()
  abonement_type: string;

  @IsInt()
  @IsNotEmpty()
  price: number;
}
