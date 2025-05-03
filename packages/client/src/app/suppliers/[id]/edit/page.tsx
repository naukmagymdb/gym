'use client';

import { apiGetFetcher } from '@/api/apiFetch';
import { editEntity } from '@/api/entity';
import EntityCreateEditPage from '@/app/page-layouts/entityCreateEditPage';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { EditSupplierDto, supplierTextFields } from '../../fields';

export default function StaffEditPage() {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const editSupplierFields = supplierTextFields;

  return (
    <EntityCreateEditPage
      title="Edit Supplier"
      textFields={editSupplierFields}
      selectFields={[]}
      isLoading={isLoading}
      fetchData={async () => {
        const data = await apiGetFetcher(`/suppliers/${id}`);
        return data;
      }}
      onSubmit={async (data: EditSupplierDto) => {
        setIsLoading(true);
        try {
          await editEntity(`/suppliers/${id}`, data);
          router.push('/suppliers');
        } catch (error) {
          throw error;
        } finally {
          setIsLoading(false);
        }
      }}
    />
  );
}
