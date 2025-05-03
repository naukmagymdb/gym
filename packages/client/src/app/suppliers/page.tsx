'use client';

import { apiGetFetcher } from '@/api/apiFetch';
import { useEffect, useState } from 'react';
import EntityListPage from '../page-layouts/entityListPage';
import { supplierColumns } from './supplierColumns';

type Product = {
  goods_name: string;
};

export default function SupplierPage() {
  const [filterOptions, setFilterOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      const filterOptions = await apiGetFetcher('/products');
      setFilterOptions(
        filterOptions.map((option: Product) => option.goods_name),
      );
    };
    fetchFilterOptions();
  }, []);

  return (
    <EntityListPage
      filterOptions={filterOptions}
      columns={supplierColumns}
      route="/suppliers"
      title="Suppliers"
      defaultSort="edrpou"
    />
  );
}
