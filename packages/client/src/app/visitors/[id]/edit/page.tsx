'use client';

import { apiGetFetcher } from '@/api/apiFetch';
import { editEntity } from '@/api/entity';
import { AuthContext } from '@/app/AuthContext';
import EntityCreateEditPage from '@/app/page-layouts/entityCreateEditPage';
import { useParams, useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { EditVisitorDto, visitorTextFields } from '../../fields';

export default function VisitorEditPage() {
  const router = useRouter();
  const { id } = useParams();
  const { userId, role } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const editVisitorFields = visitorTextFields.filter(
    (field) => field.key !== 'login_password',
  );

  if (role === 'user' && userId !== Number(id)) {
    return <div>You are not authorized to edit this visitor</div>;
  }

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
          if (role === 'user') {
            router.push('/dashboard');
          } else {
            router.push('/visitors');
          }
        } catch (error) {
          throw error;
        } finally {
          setIsLoading(false);
        }
      }}
    />
  );
}
