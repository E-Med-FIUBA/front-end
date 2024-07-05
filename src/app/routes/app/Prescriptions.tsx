import { ContentLayout } from "@/components/layouts/ContentLayout";
import { PrescriptionForm } from "@/features/prescriptions/components/PrescriptionForm";

export function PrescriptionsRoute() {
  return (
    <ContentLayout title="Prescripciones">
        <PrescriptionForm />
    </ContentLayout>
  );
}
