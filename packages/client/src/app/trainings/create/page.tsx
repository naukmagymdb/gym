'use client';

import { apiGetFetcher } from '@/api/apiFetch';
import { createEntity } from '@/api/entity';
import EntityCreateEditPage, {
  SelectField,
} from '@/app/page-layouts/entityCreateEditPage';
import { Staff } from '@/app/staff/staffColumns';
import { Visitor } from '@/app/visitors/visitorsColumns';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  CreateTrainingDto,
  trainingSelectFields,
  trainingTextFields,
} from '../fields';

export default function TrainingCreatePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectFields, setSelectFields] =
    useState<SelectField[]>(trainingSelectFields);

  useEffect(() => {
    const fetchData = async () => {
      const staff = await apiGetFetcher('/staff');
      const visitors = await apiGetFetcher('/visitors');
      setSelectFields(
        trainingSelectFields.map((field) => ({
          ...field,
          options:
            field.key === 'visitor_id'
              ? visitors.map((visitor: Visitor) => ({
                  label:
                    visitor.visitor_name +
                    ' ' +
                    visitor.surname +
                    ' ' +
                    visitor.patronymic,
                  value: visitor.id,
                }))
              : staff.map((staff: Staff) => ({
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
      title="Create Training"
      textFields={trainingTextFields}
      selectFields={selectFields}
      isLoading={isLoading}
      onSubmit={async (data: CreateTrainingDto) => {
        setIsLoading(true);
        try {
          await createEntity('/trainings', data);
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
