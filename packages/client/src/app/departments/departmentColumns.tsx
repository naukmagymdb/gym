import ActionCell from '@/components/data-table/cells/actionsCell';
import { ColumnDef } from '@tanstack/react-table';

export type Department = {
  department_id: number;
  address: string;
  // emails: string[];
  // phones: string[];
};

export const departmentColumns: ColumnDef<Department>[] = [
  {
    header: 'ID',
    accessorKey: 'department_id',
  },
  {
    header: 'Address',
    accessorKey: 'address',
  },
  {
    header: 'Actions',
    size: 50,
    cell: ({ row }) => {
      return (
        <ActionCell
          id={row.original.department_id.toString()}
          openRoute={`/departments/${row.original.department_id}`}
          row={row}
          isLoading={false}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      );
    },
  },
];
