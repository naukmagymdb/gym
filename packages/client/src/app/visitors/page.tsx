'use client';

import EntityListPage from '../page-layouts/entityListPage';
import { visitorsColumns } from './visitorsColumns';

export default function VisitorsPage() {
  return (
    <EntityListPage
      columns={visitorsColumns}
      route="/visitors"
      title="Visitors"
      defaultSort="surname"
    />
  );
}
