'use client';

import { apiGetFetcher } from '@/api/apiFetch';
import DataTable from '@/components/data-table';
import { Button } from '@/components/ui/button';
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
import Link from 'next/link';
import { useMemo, useState } from 'react';
import useSWR from 'swr';
export interface EntityListPageProps<Data> {
  columns: ColumnDef<Data>[];
  route: string;
  title: string;
  defaultSort?: string;
  filterOptions?: string[];
  useManagerFilter?: boolean;
}

export default function EntityListPage<Data>({
  title,
  columns,
  route,
  defaultSort,
  filterOptions,
  useManagerFilter = false,
}: EntityListPageProps<Data>) {
  const [managerFilter, setManagerFilter] = useState<string>('all');

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

  const { sort, setSort, order, setOrder, filter, setFilter, queryParams } =
    useQueryParams(sortFields, defaultSort);
  //   const handleSearch = useDebounce(setSearch, 300);

  const fetchRoute = useMemo(() => {
    let baseRoute = route;
    if (useManagerFilter && managerFilter === 'department manager') {
      baseRoute = `${route}/self_dep_managers`;
    }
    return `${baseRoute}?${queryParams.toString()}`;
  }, [route, queryParams, useManagerFilter, managerFilter]);

  const { data, isLoading } = useSWR<Data[]>(fetchRoute, apiGetFetcher);

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

          {filterOptions && filterOptions.length > 0 && (
            <div className="flex items-center gap-2">
              <Label className="text-nowrap">Filter:</Label>
              <Select
                value={filter}
                onValueChange={(value) => setFilter(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter:" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {filterOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {useManagerFilter && (
            <div className="flex items-center gap-2">
              <Label className="text-nowrap">Status:</Label>
              <Select
                value={managerFilter}
                onValueChange={(value) => setManagerFilter(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status:" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="department manager">
                    Department Manager
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

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

          {/* <Input
            placeholder="Search..."
            defaultValue={search}
            onChange={(e) => handleSearch(e.target.value)}
          /> */}
          <Link href={`${route}/create`}>
            <Button>Create</Button>
          </Link>
        </div>
      </div>
      <DataTable columns={columns} data={data ?? []} isLoading={isLoading} />
    </div>
  );
}
