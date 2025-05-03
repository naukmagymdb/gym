import { deleteEntity } from '@/api/entity';
import ActionCell from '@/components/data-table/cells/actionsCell';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';

export type Supplier = {
  edrpou: number;
  email: string;
  phone_num: string;
};

export const supplierColumns: ColumnDef<Supplier>[] = [
  {
    header: 'EDRPOU',
    accessorKey: 'edrpou',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Phone Number',
    accessorKey: 'phone_num',
  },
  {
    header: 'Actions',
    size: 50,
    cell: ({ row }) => {
      return (
        <ActionCell
          id={row.original.edrpou.toString()}
          row={row}
          isLoading={false}
          onEdit={() => {}}
          onDelete={async () => {
            try {
              await deleteEntity(`/suppliers/${row.original.edrpou}`);
              window.location.reload();
            } catch (error) {
              toast.error('Could not delete supplier');
              console.error(error);
            }
          }}
        />
      );
    },
  },
];
