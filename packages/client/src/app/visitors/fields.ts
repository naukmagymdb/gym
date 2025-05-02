import { TextField } from '@/app/page-layouts/entityCreateEditPage';

export type EditVisitorDto = {
  birth_date?: string;
  visitor_name?: string;
  surname?: string;
  patronymic?: string;
  phone_num?: string;
  email?: string;
  login_password?: string;
};

export type CreateVisitorDto = {
  birth_date: string;
  visitor_name: string;
  surname: string;
  patronymic: string;
  phone_num: string;
  email?: string;
  login_password: string;
};

export const visitorTextFields: TextField[] = [
  {
    label: 'Visitor Name',
    key: 'visitor_name',
    placeholder: 'Enter visitor name',
    type: 'text',
    required: true,
    validation: {
      required: true,
    },
  },
  {
    label: 'Surname',
    key: 'surname',
    placeholder: 'Enter surname',
    type: 'text',
    required: true,
    validation: {
      required: true,
    },
  },
  {
    label: 'Patronymic',
    key: 'patronymic',
    placeholder: 'Enter patronymic',
    type: 'text',
    required: true,
    validation: {
      required: true,
    },
  },
  {
    label: 'Phone',
    key: 'phone_num',
    placeholder: 'Enter phone',
    type: 'tel',
    required: true,
    validation: {
      required: true,
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
    label: 'Email',
    key: 'email',
    placeholder: 'Enter email',
    type: 'email',
    required: true,
    validation: {
      required: 'Email is required',
    },
  },
  {
    label: 'Birth Date',
    key: 'birth_date',
    placeholder: 'Enter birth date',
    type: 'date',
    required: true,
    validation: {
      required: true,
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
