'use client';

import { createEntity } from '@/api/entity';
import EntityCreateEditPage from '@/app/page-layouts/entityCreateEditPage';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { contractTextFields, CreateContractDto } from '../fields';

export default function ContractCreatePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <EntityCreateEditPage
      title="Create Contract"
      textFields={contractTextFields}
      selectFields={[]}
      isLoading={isLoading}
      onSubmit={async (data: CreateContractDto) => {
        setIsLoading(true);
        try {
          await createEntity('/contracts', data);
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
