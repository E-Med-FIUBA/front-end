import { patientsMock } from "@/testing/mocks/patients";
import { useParams } from "react-router-dom";

export function PatientDetailsRoute() {
  let { patientId } = useParams();

  if (!patientId) {
    throw new Error("No patient id provided");
  }

  const patient = patientsMock[parseInt(patientId) - 1];

  return (
    <div className="h-full bg-card rounded-md border col-span-4 xl:col-span-3">
      <div className="p-2">
        <h2 className="text-xl font-semibold">
          {patient.firstName} {patient.lastName}
        </h2>

        <p className="text-sm mt-2">DNI: 12345678</p>
      </div>
    </div>
  );
}
