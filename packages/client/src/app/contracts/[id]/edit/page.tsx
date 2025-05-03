'use client';

import { apiGetFetcher } from '@/api/apiFetch';
import { editEntity } from '@/api/entity';
import EntityCreateEditPage from '@/app/page-layouts/entityCreateEditPage';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { contractTextFields, EditContractDto } from '../../fields';

export default function ContractEditPage() {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const editContractFields = contractTextFields;

  return (
    <EntityCreateEditPage
      title="Edit contracts"
      textFields={editContractFields}
      selectFields={[]}
      isLoading={isLoading}
      fetchData={async () => {
        const data = await apiGetFetcher(`/contracts/${id}`);
        return data;
      }}
      onSubmit={async (data: EditContractDto) => {
        setIsLoading(true);
        try {
          await editEntity(`/contracts/${id}`, data);
          router.push('/contracts');
        } catch (error) {
          throw error;
        } finally {
          setIsLoading(false);
        }
      }}
    />
  );
}
