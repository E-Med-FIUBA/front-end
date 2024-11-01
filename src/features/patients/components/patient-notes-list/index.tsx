import { DataTable } from '@/components/ui/data-table';
import { PatientNote } from '@/types/api';

import { createColumns } from './columns';

export const PatientNotesList = ({
  data,
  openEditModal,
  openDeleteModal,
  openViewModal,
}: {
  data: Array<Record<string, unknown>>;
  openEditModal: (note: PatientNote) => void;
  openDeleteModal: (note: PatientNote) => void;
  openViewModal: (note: PatientNote) => void;
}) => {
  const columns = createColumns(openEditModal, openDeleteModal, openViewModal);
  return <DataTable columns={columns} data={data} />;
};
