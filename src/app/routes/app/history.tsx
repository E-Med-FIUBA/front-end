import { useEffect, useState } from 'react';

import { DataTable } from '@/components/ui/data-table';
import { DebouncedInput } from '@/components/ui/debounced-input';
import { ContentLayout } from '@/features/dashboard-layout/content-layout';
import { getPrescriptionHistory } from '@/features/history/api';
import { createColumns } from '@/features/history/columns';
import PrescriptionViewModal from '@/features/history/components/prescription-view-modal';
import { Prescription } from '@/types/api';

export function HistoryRoute() {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] =
    useState<Prescription | null>(null);
  const [data, setData] = useState<Prescription[]>([]);
  const [dniFilter, setDniFilter] = useState('');
  useEffect(() => {
    getPrescriptionHistory().then((prescriptions) => {
      setData(prescriptions);
    });
  }, []);

  const openViewModal = (prescription: Prescription) => {
    setIsViewModalOpen(true);
    setSelectedPrescription(prescription);
  };

  const columns = createColumns(openViewModal);

  return (
    <ContentLayout
      title="Historial"
      actions={
        <DebouncedInput
          type="search"
          placeholder="Buscar DNI"
          value={dniFilter}
          onChange={(value) => setDniFilter(value)}
          debounce={300}
        />
      }
    >
      <div className="h-full overflow-hidden">
        <DataTable
          columns={columns}
          data={data}
          filters={[
            {
              id: 'dni',
              value: dniFilter,
            },
          ]}
        />
      </div>
      <PrescriptionViewModal
        open={isViewModalOpen}
        setOpen={setIsViewModalOpen}
        prescription={selectedPrescription}
        setPrescription={setSelectedPrescription}
      />
    </ContentLayout>
  );
}
