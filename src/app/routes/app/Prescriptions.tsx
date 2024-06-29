import { patientsMock } from "@/testing/mocks/patients";

export function PrescriptionsRoute() {
  return (
    <div className="container">
      <ul>
        {patientsMock.map((patient) => (
          <li key={patient.id}>
            {patient.firstName} {patient.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}
