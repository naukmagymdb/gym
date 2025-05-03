'use client';

import { apiGetFetcher } from '@/api/apiFetch';
import { editEntity } from '@/api/entity';
import EntityCreateEditPage from '@/app/page-layouts/entityCreateEditPage';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { departmentTextFields, EditDepartmentDto } from '../../fields';

export default function DepartmentEditPage() {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const editDepartmentFields = departmentTextFields;

  return (
    <EntityCreateEditPage
      title="Edit departments"
      textFields={editDepartmentFields}
      selectFields={[]}
      isLoading={isLoading}
      fetchData={async () => {
        const data = await apiGetFetcher(`/departments/${id}`);
        return data;
      }}
      onSubmit={async (data: EditDepartmentDto) => {
        setIsLoading(true);
        try {
          await editEntity(`/departments/${id}`, data);
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
