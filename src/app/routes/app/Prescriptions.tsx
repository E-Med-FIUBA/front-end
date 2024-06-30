import { ContentLayout } from "@/components/layouts/ContentLayout";
import { PrescriptionForm } from "@/features/prescriptions/components/PrescriptionForm";

export function PrescriptionsRoute() {
  return (
    <ContentLayout title="Prescripciones">
      <div className="flex h-full items-center justify-center">
        <PrescriptionForm />
      </div>
    </ContentLayout>
  );
}
