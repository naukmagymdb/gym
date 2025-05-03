'use client';

import { apiGetFetcher } from '@/api/apiFetch';
import { createEntity } from '@/api/entity';
import EntityCreateEditPage from '@/app/page-layouts/entityCreateEditPage';
import { Supplier } from '@/app/suppliers/supplierColumns';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  contractSelectFields,
  contractTextFields,
  CreateContractDto,
} from '../fields';

export default function ContractCreatePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectFields, setSelectFields] = useState(contractSelectFields);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const suppliers = await apiGetFetcher('/suppliers');
      setSelectFields(
        contractSelectFields.map((field) => ({
          ...field,
          options: suppliers.map((supplier: Supplier) => ({
            label: supplier.edrpou.toString(),
            value: supplier.edrpou.toString(),
          })),
        })),
      );
    };
    fetchSuppliers();
  }, []);

  return (
    <EntityCreateEditPage
      title="Create Contract"
      textFields={contractTextFields}
      selectFields={selectFields}
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
