'use client';

import { apiGetFetcher } from '@/api/apiFetch';
import DataTable from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useQueryParams } from '@/hooks/useQueryParams';
import { ColumnDef } from '@tanstack/react-table';
import { useDebounce } from '@uidotdev/usehooks';
import Link from 'next/link';
import { useMemo } from 'react';
import useSWR from 'swr';
export interface EntityListPageProps<Data> {
  columns: ColumnDef<Data>[];
  route: string;
  title: string;
  defaultSort?: string;
}

export default function EntityListPage<Data>({
  title,
  columns,
  route,
  defaultSort,
}: EntityListPageProps<Data>) {
  const sortFields = useMemo(() => {
    return columns
      .map((column) => {
        if ('accessorKey' in column) {
          return column.accessorKey;
        }
        return null;
      })
      .filter(Boolean) as string[];
  }, [columns]);

  const { sort, setSort, order, setOrder, search, setSearch, queryParams } =
    useQueryParams(sortFields, defaultSort);
  const handleSearch = useDebounce(setSearch, 300);

  const { data, isLoading } = useSWR<Data[]>(
    `${route}?${queryParams.toString()}`,
    apiGetFetcher,
  );

  return (
    <div className="flex flex-col gap-4 p-12">
      <div className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-2">
            <Label className="text-nowrap">Sort by:</Label>
            <Select value={sort} onValueChange={(value) => setSort(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by:" />
              </SelectTrigger>
              <SelectContent>
                {sortFields.map((field) => (
                  <SelectItem key={field} value={field}>
                    {(() => {
                      const column = columns.find(
                        (col) =>
                          'accessorKey' in col && col.accessorKey === field,
                      );
                      const header = column?.header;
                      return typeof header === 'string' ? header : field;
                    })()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Label className="text-nowrap">Order:</Label>
            <Select
              value={order}
              onValueChange={(value) => setOrder(value as 'asc' | 'desc')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Order:" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* <div className="flex items-center gap-2">
            <Label className="text-nowrap">Items per page:</Label>
            <Select
              value={limit.toString()}
              onValueChange={(value) => setLimit(Number(value))}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Items per page:" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

          <Input
            placeholder="Search..."
            defaultValue={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Link href={`${route}/create`}>
            <Button>Create</Button>
          </Link>
        </div>
      </div>
      <DataTable columns={columns} data={data ?? []} isLoading={isLoading} />
    </div>
  );
}
