import { deleteEntity } from '@/api/entity';
import ActionCell from '@/components/data-table/cells/actionsCell';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';

export type Training = {
  visitor_id: number;
  staff_id: number;
  date_of_begin: string;
  date_of_end: string;
};

export const trainingColumns: ColumnDef<Training>[] = [
  {
    header: 'Visitor ID',
    accessorKey: 'visitor_id',
  },
  {
    header: 'Staff ID',
    accessorKey: 'staff_id',
  },
  {
    header: 'Date of Begin',
    accessorKey: 'date_of_begin',
    cell: ({ row }) => {
      return <div>{new Date(row.original.date_of_begin).toLocaleString()}</div>;
    },
  },
  {
    header: 'Date of End',
    accessorKey: 'date_of_end',
    cell: ({ row }) => {
      return <div>{new Date(row.original.date_of_end).toLocaleString()}</div>;
    },
  },
  {
    header: 'Actions',
    size: 50,
    cell: ({ row }) => {
      return (
        <ActionCell
          id={row.original.visitor_id.toString()}
          row={row}
          isLoading={false}
          onEdit={() => {}}
          onDelete={async () => {
            try {
              await deleteEntity(`/trainings/${row.original.visitor_id}`);
              window.location.reload();
            } catch (error) {
              toast.error('Could not delete training');
              console.error(error);
            }
          }}
        />
      );
    },
  },
];
