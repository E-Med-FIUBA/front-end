import { ContentLayout } from '@/features/dashboard-layout/content-layout';
import { PrescriptionForm } from '@/features/prescriptions/components/prescription-form';

export function PrescriptionsRoute() {
  return (
    <ContentLayout title="Prescripciones">
      <PrescriptionForm />
    </ContentLayout>
  );
}
