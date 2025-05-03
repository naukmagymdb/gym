import { SelectField, TextField } from '../page-layouts/entityCreateEditPage';

export type ProductInContractDTO = {
  goods_id: number;
  goods_name?: string;
  goods_price: number;
  goods_amount: number;
  total_goods_price?: number;
};

export type CreateContractDto = {
  edrpou: number;
  products?: ProductInContractDTO[];
  contract_date: string;
};

export type EditContractDto = {
  edrpou?: number;
  products?: ProductInContractDTO[];
  contract_date?: string;
};

export const contractTextFields: TextField[] = [
  {
    key: 'contract_date',
    label: 'Contract date',
    placeholder: 'Enter contract date',
    type: 'date',
    required: true,
    validation: {
      required: 'Contract date is required',
    },
  },
];

export const contractSelectFields: SelectField[] = [
  {
    key: 'edrpou',
    label: 'EDRPOU',
    options: Array.from({ length: 20 }, (_, i) => ({
      label: (i + 1).toString(),
      value: (i + 1).toString(),
    })),
    required: true,
  },
  // {
  //   key: 'department_id',
  //   label: 'Department',
  //   options: [],
  //   required: true,
  // },
];
