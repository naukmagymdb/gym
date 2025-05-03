'use client';

import { apiGetFetcher } from '@/api/apiFetch';
import { editEntity } from '@/api/entity';
import EntityCreateEditPage from '@/app/page-layouts/entityCreateEditPage';
import { Staff } from '@/app/staff/staffColumns';
import { Visitor } from '@/app/visitors/visitorsColumns';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  EditTrainingDto,
  trainingSelectFields,
  trainingTextFields,
} from '../../fields';

export default function StaffEditPage() {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const editTrainingFields = trainingTextFields;
  const [selectFields, setSelectFields] = useState(trainingSelectFields);

  useEffect(() => {
    const fetchData = async () => {
      const dataVisitors = await apiGetFetcher(`/visitors`);
      const dataStaff = await apiGetFetcher(`/staff`);
      setSelectFields(
        trainingSelectFields.map((field) => ({
          ...field,
          options:
            field.key === 'visitor_id'
              ? dataVisitors.map((visitor: Visitor) => ({
                  label:
                    visitor.visitor_name +
                    ' ' +
                    visitor.surname +
                    ' ' +
                    visitor.patronymic,
                  value: visitor.id,
                }))
              : dataStaff.map((staff: Staff) => ({
                  label:
                    staff.staff_name +
                    ' ' +
                    staff.surname +
                    ' ' +
                    staff.patronymic,
                  value: staff.id,
                })),
        })),
      );
    };
    fetchData();
  }, []);

  return (
    <EntityCreateEditPage
      title="Edit Training"
      textFields={editTrainingFields}
      selectFields={selectFields}
      isLoading={isLoading}
      fetchData={async () => {
        const data = await apiGetFetcher(`/trainings/${id}`);
        return data;
      }}
      onSubmit={async (data: EditTrainingDto) => {
        setIsLoading(true);
        try {
          await editEntity(`/trainings/${id}`, data);
          router.push('/trainings');
        } catch (error) {
          throw error;
        } finally {
          setIsLoading(false);
        }
      }}
    />
  );
}
