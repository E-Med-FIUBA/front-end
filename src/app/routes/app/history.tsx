import { ContentLayout } from '@/features/dashboard-layout/content-layout';
import { HistoryTable } from '@/features/history/history-table';

export function HistoryRoute() {
  return (
    <ContentLayout title="Historial">
      <HistoryTable />
    </ContentLayout>
  );
}
