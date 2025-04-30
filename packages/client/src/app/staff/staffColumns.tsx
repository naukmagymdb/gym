import { ColumnDef } from '@tanstack/react-table';

export type Staff = {
  id: number;
  contract_num: string;
  staff_name: string;
  surname: string;
  patronymic?: string;
  salary: number;
  phone_num: string;
  qualification_cert_number_of_coach?: string;
  email?: string;
  department_id: number;
};

export const staffColumns: ColumnDef<Staff>[] = [
  {
    header: 'Name',
    accessorKey: 'staff_name',
  },
  {
    header: 'Surname',
    accessorKey: 'surname',
  },
  {
    header: 'Patronymic',
    accessorKey: 'patronymic',
  },
  {
    header: 'Salary',
    accessorKey: 'salary',
  },
  {
    header: 'Phone Number',
    accessorKey: 'phone_num',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
];
