import { IsNotEmpty, IsString } from 'class-validator';

export class ProductDto {
  constructor(partial: Partial<ProductDto>) {
    Object.assign(this, partial);
  }

  @IsString()
  @IsNotEmpty()
  goods_name: string;
}
