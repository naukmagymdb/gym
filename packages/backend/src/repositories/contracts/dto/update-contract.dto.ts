import { IsDateString, IsOptional, IsString } from 'class-validator';
import { ProductInContractDTO } from './product-in-contract.dto';

export class UpdateContractDto {
  @IsOptional()
  @IsString()
  edrpou?: string;

  @IsOptional()
  products?: ProductInContractDTO[];

  @IsOptional()
  @IsDateString()
  contract_date?: string;
}
