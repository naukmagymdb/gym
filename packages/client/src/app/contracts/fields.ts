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
    key: 'edrpou',
    label: 'EDRPOU',
    placeholder: 'Enter EDRPOU',
    type: 'number',
    required: true,
    validation: {
      required: 'EDRPOU is required',
    },
  },
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

export const departmentSelectFields: SelectField[] = [
  // {
  //   key: 'department_id',
  //   label: 'Department',
  //   options: [],
  //   required: true,
  // },
];
