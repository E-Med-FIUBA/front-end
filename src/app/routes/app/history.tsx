import { useEffect, useState } from 'react';

import { DataTable } from '@/components/ui/data-table';
import { ContentLayout } from '@/features/dashboard-layout/content-layout';
import { getPrescriptionHistory } from '@/features/history/api';
import { columns } from '@/features/history/columns';
import { Prescription } from '@/types/api';

export function HistoryRoute() {
  const [data, setData] = useState<Prescription[]>([]);
  useEffect(() => {
    getPrescriptionHistory().then((prescriptions) => {
      setData(prescriptions);
    });
  }, []);

  return (
    <ContentLayout title="Historial">
      <DataTable columns={columns} data={data} />
    </ContentLayout>
  );
}
