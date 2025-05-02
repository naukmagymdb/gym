'use client';

import { createEntity } from '@/api/entity';
import EntityCreateEditPage from '@/app/page-layouts/entityCreateEditPage';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CreateVisitorDto, visitorTextFields } from '../fields';

export default function VisitorCreatePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <EntityCreateEditPage
      title="Create Visitor"
      textFields={visitorTextFields}
      selectFields={[]}
      isLoading={isLoading}
      onSubmit={async (data: CreateVisitorDto) => {
        setIsLoading(true);
        try {
          await createEntity('/visitors', data);
          router.push('/visitors');
        } catch (error) {
          throw error;
        } finally {
          setIsLoading(false);
        }
      }}
    />
  );
}
