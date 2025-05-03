'use client';

import EntityListPage from '../page-layouts/entityListPage';
import { trainingColumns } from './trainingsColumns';

export default function TrainingPage() {
  return (
    <EntityListPage
      columns={trainingColumns}
      route="/trainings"
      title="Trainings"
      defaultSort="visitor_id"
    />
  );
}
