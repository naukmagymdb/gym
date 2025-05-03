'use client';

import { apiGetFetcher } from '@/api/apiFetch';
import { editEntity } from '@/api/entity';
import EntityCreateEditPage from '@/app/page-layouts/entityCreateEditPage';
import { Supplier } from '@/app/suppliers/supplierColumns';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  contractSelectFields,
  contractTextFields,
  EditContractDto,
} from '../../fields';

export default function ContractEditPage() {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const editContractFields = contractTextFields;
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
      title="Edit contracts"
      textFields={editContractFields}
      selectFields={selectFields}
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
