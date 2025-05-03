'use client';

import EntityListPage from '../page-layouts/entityListPage';
import { departmentColumns } from './departmentColumns';

export default function DepartmentPage() {
  return (
    <EntityListPage
      columns={departmentColumns}
      route="/departments"
      title="Departments"
      defaultSort="department_id"
    />
  );
}
