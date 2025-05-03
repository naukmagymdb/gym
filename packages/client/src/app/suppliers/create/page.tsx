'use client';

import { createEntity } from '@/api/entity';
import EntityCreateEditPage from '@/app/page-layouts/entityCreateEditPage';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CreateSupplierDto, supplierTextFields } from '../fields';

export default function StaffCreatePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <EntityCreateEditPage
      title="Create Supplier"
      textFields={supplierTextFields}
      selectFields={[]}
      isLoading={isLoading}
      onSubmit={async (data: CreateSupplierDto) => {
        setIsLoading(true);
        try {
          await createEntity('/suppliers', data);
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
