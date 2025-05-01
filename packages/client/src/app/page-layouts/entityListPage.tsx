'use client';

import { apiGetFetcher } from '@/api/apiFetch';
import DataTable from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import useSWR from 'swr';

export interface EntityListPageProps<Data> {
  columns: ColumnDef<Data>[];
  dataRoute: string;
}

export default function EntityListPage<Data>({
  columns,
  dataRoute,
}: EntityListPageProps<Data>) {
  const { data, isLoading } = useSWR<Data[]>(dataRoute, apiGetFetcher);
  console.log(columns, data, isLoading);
  return (
    <div className="flex flex-col gap-4 p-12">
      <h1 className="text-2xl font-bold">Staff</h1>
      <DataTable columns={columns} data={data ?? []} isLoading={isLoading} />
    </div>
  );
}
