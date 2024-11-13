import { DataTable } from '@/components/ui/data-table';
import { ContentLayout } from '@/features/dashboard-layout/content-layout';
import { columns } from '@/features/medicines/columns';
import { useFetch } from '@/hooks/use-fetch';
import { getPresentations } from '@/lib/api/drugs';
import { Presentation } from '@/types/api';

export function MedicinesRoute() {
  const { data } = useFetch<Presentation[]>(getPresentations);

  return (
    <ContentLayout title="Medicamentos">
      <DataTable columns={columns} data={data || []} />
    </ContentLayout>
  );
}
