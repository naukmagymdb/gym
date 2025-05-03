import { SelectField, TextField } from '../page-layouts/entityCreateEditPage';

export type CreateDepartmentDto = {
  address: string;
  // emails: string[];
  // phones: string[];
};

export type EditDepartmentDto = {
  address?: string;
  // emails?: string[];
  // phones?: string[];
};

export const departmentTextFields: TextField[] = [
  {
    key: 'address',
    label: 'Department address',
    placeholder: 'Enter department address',
    type: 'text',
    required: true,
    validation: {
      required: 'Department address is required',
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
