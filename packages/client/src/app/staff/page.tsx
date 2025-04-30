'use client';

import { getStaff } from '@/api/staff';
import DataTable from '@/components/data-table';
import { useEffect, useState } from 'react';
import { Staff, staffColumns } from './staffColumns';

export default function StaffPage() {
  const [data, setData] = useState<Staff[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const data = await getStaff();
      setData(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-12">
      <h1 className="text-2xl font-bold">Staff</h1>
      <DataTable
        columns={staffColumns}
        data={data}
        updateData={() => {}}
        isLoading={isLoading}
      />
    </div>
  );
}
