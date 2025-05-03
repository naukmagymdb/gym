import { deleteEntity } from '@/api/entity';
import ActionCell from '@/components/data-table/cells/actionsCell';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';

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
          onDelete={async () => {
            try {
              await deleteEntity(`/departments/${row.original.department_id}`);
              window.location.reload();
            } catch (error) {
              toast.error('Could not delete department');
              console.error(error);
            }
          }}
        />
      );
    },
  },
];
