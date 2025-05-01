import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAbonTypeDto {
  constructor(partial: Partial<CreateAbonTypeDto>) {
    Object.assign(this, partial);
  }

  @IsString()
  @IsNotEmpty()
  abonement_type: string;

  @IsInt()
  @IsNotEmpty()
  price: number;
}
