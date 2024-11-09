import { useEffect, useState } from 'react';

import { DataTable } from '@/components/ui/data-table';
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
    <ContentLayout title="Historial">
      <div className="h-full overflow-hidden">
        <DataTable columns={columns} data={data} />
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
