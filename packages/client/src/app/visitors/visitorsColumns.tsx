import ActionCell from '@/components/data-table/cells/actionsCell';
import { ColumnDef } from '@tanstack/react-table';

export type Visitor = {
  id: number;
  birth_date: Date;
  visitor_name: string;
  surname: string;
  patronymic: string;
  phone_num: string;
  email?: string;
  login_password?: string;
};

export const visitorsColumns: ColumnDef<Visitor>[] = [
  {
    header: 'Name',
    accessorKey: 'visitor_name',
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
    header: 'Phone',
    accessorKey: 'phone_num',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Birth Date',
    accessorKey: 'birth_date',
    cell: ({ row }) => {
      const birthDate = row.original.birth_date;
      return <span>{new Date(birthDate).toLocaleDateString()}</span>;
    },
  },
  {
    header: 'Age',
    accessorKey: 'age',
    cell: ({ row }) => {
      const birthDate = row.original.birth_date;
      const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
      return <span>{age}</span>;
    },
  },
  {
    header: 'Actions',
    size: 50,
    cell: ({ row }) => {
      return (
        <ActionCell
          row={row}
          id={row.original.id.toString()}
          isLoading={false}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      );
    },
  },
];
