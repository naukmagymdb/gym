import { IsDateString, IsNumber, IsOptional } from 'class-validator';
import { ProductInContractDTO } from './product-in-contract.dto';

export class UpdateContractDto {
  @IsOptional()
  @IsNumber()
  edrpou?: number;

  @IsOptional()
  products?: ProductInContractDTO[];

  @IsOptional()
  @IsDateString()
  contract_date?: string;
}
