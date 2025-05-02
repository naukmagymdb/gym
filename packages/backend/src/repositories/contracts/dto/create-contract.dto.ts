import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ProductInContractDTO } from './product-in-contract.dto';

export class CreateContractDto {
  @IsNotEmpty()
  @IsNumber()
  edrpou: number;

  @IsOptional()
  products?: ProductInContractDTO[];

  @IsNotEmpty()
  @IsDateString()
  contract_date: string;
}
