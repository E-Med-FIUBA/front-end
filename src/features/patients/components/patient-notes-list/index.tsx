import { DataTable } from '@/components/ui/data-table';
import { PatientNote } from '@/types/api';

import { createColumns } from './columns';

export const PatientNotesList = ({
  data,
  openEditModal,
  openDeleteModal,
}: {
  data: Array<Record<string, unknown>>;
  openEditModal: (note: PatientNote) => void;
  openDeleteModal: (note: PatientNote) => void;
}) => {
  const columns = createColumns(openEditModal, openDeleteModal);
  return <DataTable columns={columns} data={data} />;
};
