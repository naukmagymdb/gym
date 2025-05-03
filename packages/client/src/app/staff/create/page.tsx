'use client';

import { apiGetFetcher } from '@/api/apiFetch';
import { createEntity } from '@/api/entity';
import EntityCreateEditPage from '@/app/page-layouts/entityCreateEditPage';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CreateStaffDto, staffSelectFields, staffTextFields } from '../fields';

// TODO: replace with a real department type
export type DepartmentTemp = {
  department_id: number;
  address: string;
};

export default function StaffCreatePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectFields, setSelectFields] = useState(staffSelectFields);

  useEffect(() => {
    const fetchDepartments = async () => {
      const departments = await apiGetFetcher('/departments');
      setSelectFields(
        staffSelectFields.map((field) => ({
          ...field,
          options: departments.map((department: DepartmentTemp) => ({
            label: department.address,
            value: department.department_id,
          })),
        })),
      );
    };
    fetchDepartments();
  }, []);

  return (
    <EntityCreateEditPage
      title="Create Staff"
      textFields={staffTextFields}
      selectFields={selectFields}
      isLoading={isLoading}
      onSubmit={async (data: CreateStaffDto) => {
        setIsLoading(true);
        try {
          await createEntity('/staff', data);
          router.push('/staff');
        } catch (error) {
          throw error;
        } finally {
          setIsLoading(false);
        }
      }}
    />
  );
}
