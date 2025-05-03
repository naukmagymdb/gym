import ActionCell from '@/components/data-table/cells/actionsCell';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ProductInContractDTO } from './fields';

export type Contract = {
  contract_num: number;
  edrpou: number;
  total_sum: number;
  products: ProductInContractDTO[];
  contract_date: string;
};

export const contractColumns: ColumnDef<Contract>[] = [
  {
    header: 'ID',
    accessorKey: 'contract_num',
  },
  {
    header: 'EDRPOU',
    accessorKey: 'edrpou',
  },
  {
    header: 'Total sum',
    accessorKey: 'total_sum',
  },
  {
    header: 'Contract date',
    accessorKey: 'contract_date',
    cell: ({ row }) => {
      return <div>{format(row.original.contract_date, 'dd/MM/yyyy')}</div>;
    },
  },
  // {
  //   header: 'Products',
  //   accessorKey: 'products',
  //   cell: ({ row }) => {
  //     return (
  //       <div>
  //         {row.original.products
  //           .map((product) => product.goods_name)
  //           .join(', ')}
  //       </div>
  //     );
  //   },
  // },
  {
    header: 'Actions',
    size: 50,
    cell: ({ row }) => {
      return (
        <ActionCell
          id={row.original.contract_num.toString()}
          openRoute={`/contracts/${row.original.contract_num}`}
          row={row}
          isLoading={false}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      );
    },
  },
];
