'use client';

import EntityListPage from '../page-layouts/entityListPage';
import { staffColumns } from './staffColumns';

export default function StaffPage() {
  return <EntityListPage columns={staffColumns} dataRoute="/staff" />;
}
