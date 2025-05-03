'use client';

import { apiGetFetcher } from '@/api/apiFetch';
import { createEntity } from '@/api/entity';
import EntityCreateEditPage from '@/app/page-layouts/entityCreateEditPage';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  CreateDepartmentDto,
  departmentSelectFields,
  departmentTextFields,
} from '../fields';

// TODO: replace with a real department type
export type DepartmentTemp = {
  department_id: number;
  address: string;
};

export default function DepartmentCreatePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectFields, setSelectFields] = useState(departmentSelectFields);

  useEffect(() => {
    const fetchDepartments = async () => {
      const departments = await apiGetFetcher('/departments');
      setSelectFields(
        departmentSelectFields.map((field) => ({
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
      title="Create Department"
      textFields={departmentTextFields}
      selectFields={selectFields}
      isLoading={isLoading}
      onSubmit={async (data: CreateDepartmentDto) => {
        setIsLoading(true);
        try {
          await createEntity('/departments', data);
          router.push('/departments');
        } catch (error) {
          throw error;
        } finally {
          setIsLoading(false);
        }
      }}
    />
  );
}
