import { ProductInContractDTO } from './product-in-contract.dto';

export class GetContractDto {
  Contract_num: number;

  Supplier_EDRPOU: number;

  Total_sum: string; // Assuming Currency is represented as a string (e.g., "USD")

  Products?: ProductInContractDTO[];

  Sign_date: string;
}
