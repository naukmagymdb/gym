'use client';

import { apiGetFetcher } from '@/api/apiFetch';
import { editEntity } from '@/api/entity';
import EntityCreateEditPage from '@/app/page-layouts/entityCreateEditPage';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DepartmentTemp } from '../../create/page';
import { EditStaffDto, staffSelectFields, staffTextFields } from '../../fields';

export default function StaffEditPage() {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const editStaffFields = staffTextFields.filter(
    (field) => field.key !== 'login_password',
  );
  const [selectFields, setSelectFields] = useState(staffSelectFields);

  useEffect(() => {
    const fetchDepartments = async () => {
      const departments = await apiGetFetcher('/department');
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
      title="Edit Staff"
      textFields={editStaffFields}
      selectFields={selectFields}
      isLoading={isLoading}
      fetchData={async () => {
        const data = await apiGetFetcher(`/staff/${id}`);
        return data;
      }}
      onSubmit={async (data: EditStaffDto) => {
        setIsLoading(true);
        try {
          await editEntity(`/staff/${id}`, data);
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
