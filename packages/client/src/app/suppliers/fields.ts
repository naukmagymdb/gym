import { TextField } from '../page-layouts/entityCreateEditPage';

export type CreateSupplierDto = {
  edrpou: string;
  email: string;
  phone_num: string;
};

export type EditSupplierDto = {
  edrpou: string;
  email: string;
  phone_num: string;
};

export const supplierTextFields: TextField[] = [
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
    key: 'email',
    label: 'Email',
    placeholder: 'Enter email',
    type: 'email',
    required: true,
    validation: {
      required: 'Email is required',
    },
  },
  {
    key: 'phone_num',
    label: 'Phone Number',
    placeholder: 'Enter phone number',
    type: 'text',
    required: true,
    validation: {
      required: 'Phone number is required',
    },
  },
];

// export const supplierSelectFields: SelectField[] = [
//   {
//     key: 'department_id',
//     label: 'Department',
//     options: [],
//     required: true,
//   },
// ];
