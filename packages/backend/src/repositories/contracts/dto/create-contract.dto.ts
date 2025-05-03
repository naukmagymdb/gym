import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductInContractDTO } from './product-in-contract.dto';

export class CreateContractDto {
  @IsNotEmpty()
  @IsString()
  edrpou: string;

  @IsOptional()
  products?: ProductInContractDTO[];

  @IsNotEmpty()
  @IsDateString()
  contract_date: string;
}
