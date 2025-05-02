import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateAbonTypeDto {
  @IsInt()
  @IsNotEmpty()
  price: number;
}
