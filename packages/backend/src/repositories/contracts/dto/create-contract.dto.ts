import {
  IsCurrency,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ProductInContractDTO } from './product-in-contract.dto';

export class CreateContractDto {
  @IsNotEmpty()
  @IsNumber()
  SupplierEDRPOU: number;

  @IsNotEmpty()
  @IsCurrency()
  Total_sum: string; // Assuming Currency is represented as a string (e.g., "USD")

  @IsOptional()
  Products?: ProductInContractDTO[];

  @IsNotEmpty()
  @IsDateString()
  Sign_date: string;
}
