import { SelectField, TextField } from '../page-layouts/entityCreateEditPage';

export type CreateStaffDto = {
  contract_num: string;
  staff_name: string;
  surname: string;
  patronymic: string;
  salary: number;
  phone_num: string;
  qualification_cert_number_of_coach: string;
  email: string;
  department_id: number;
  login_password: string;
};

export type EditStaffDto = {
  contract_num: string;
  staff_name: string;
  surname: string;
  patronymic: string;
  salary: number;
  phone_num: string;
  qualification_cert_number_of_coach: string;
  email: string;
  department_id: number;
  login_password: string;
};

export const staffTextFields: TextField[] = [
  {
    key: 'contract_num',
    label: 'Contract Number',
    placeholder: 'Enter contract number',
    type: 'text',
    required: true,
    validation: {
      required: 'Contract number is required',
    },
  },
  {
    key: 'staff_name',
    label: 'Staff Name',
    placeholder: 'Enter staff name',
    type: 'text',
    required: true,
    validation: {
      required: 'Staff name is required',
    },
  },
  {
    key: 'surname',
    label: 'Surname',
    placeholder: 'Enter surname',
    type: 'text',
    required: true,
    validation: {
      required: 'Surname is required',
    },
  },
  {
    key: 'patronymic',
    label: 'Patronymic',
    placeholder: 'Enter patronymic',
    type: 'text',
    required: true,
    validation: {
      required: 'Patronymic is required',
    },
  },
  {
    key: 'salary',
    label: 'Salary',
    placeholder: 'Enter salary',
    type: 'number',
    required: true,
    validation: {
      required: 'Salary is required',
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
      minLength: {
        value: 13,
        message: 'Phone number must be 13 characters long',
      },
      maxLength: {
        value: 13,
        message: 'Phone number must be 13 characters long',
      },
    },
  },
  {
    key: 'qualification_cert_number_of_coach',
    label: 'Qualification Certificate Number of Coach',
    placeholder: 'Enter qualification certificate number of coach',
    type: 'text',
    required: true,
    validation: {
      required: 'Qualification certificate number of coach is required',
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
    label: 'Login Password',
    key: 'login_password',
    placeholder: 'Enter login password',
    type: 'text',
    required: true,
    validation: {
      required: true,
      minLength: {
        value: 8,
        message: 'Password must be at least 8 characters long',
      },
    },
  },
];

export const staffSelectFields: SelectField[] = [
  {
    key: 'department_id',
    label: 'Department',
    options: [],
    required: true,
  },
];
