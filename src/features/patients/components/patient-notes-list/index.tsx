import { DataTable } from '@/components/ui/data-table';

import { columns } from './columns';

export const PatientNotesList = ({
  data,
}: {
  data: Array<Record<string, unknown>>;
}) => {
  return <DataTable columns={columns} data={data} />;
};
