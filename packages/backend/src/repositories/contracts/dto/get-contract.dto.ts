import { ProductInContractDTO } from './product-in-contract.dto';

export class GetContractDto {
  contract_num: number;

  edrpou: number;

  total_sum: number; // Assuming Currency is represented as a string (e.g., "USD")

  products?: ProductInContractDTO[];

  contract_date: string;
}
