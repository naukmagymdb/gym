'use client';

import { apiGetFetcher } from '@/api/apiFetch';
import { editEntity } from '@/api/entity';
import EntityCreateEditPage from '@/app/page-layouts/entityCreateEditPage';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { EditVisitorDto, visitorTextFields } from '../../fields';

export default function VisitorEditPage() {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const editVisitorFields = visitorTextFields.filter(
    (field) => field.key !== 'login_password',
  );

  return (
    <EntityCreateEditPage
      title="Edit Visitor"
      textFields={editVisitorFields}
      selectFields={[]}
      isLoading={isLoading}
      fetchData={async () => {
        const data = await apiGetFetcher(`/visitors/${id}`);
        data.birth_date = data.birth_date.split('T')[0]; // remove time
        return data;
      }}
      onSubmit={async (data: EditVisitorDto) => {
        setIsLoading(true);
        try {
          await editEntity(`/visitors/${id}`, data);
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
