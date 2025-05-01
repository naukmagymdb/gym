import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateAbonTypeDto {
  constructor(partial: Partial<UpdateAbonTypeDto>) {
    Object.assign(this, partial);
  }

  @IsInt()
  @IsNotEmpty()
  price: number;
}
