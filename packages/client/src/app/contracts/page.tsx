'use client';

import EntityListPage from '../page-layouts/entityListPage';
import { contractColumns } from './contractColumns';

export default function ContractPage() {
  return (
    <EntityListPage
      columns={contractColumns}
      route="/contracts"
      title="Contracts"
      defaultSort="contract_num"
      filterNum={true}
    />
  );
}
