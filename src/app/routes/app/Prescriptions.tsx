import { patients } from "@/testing/mocks/patients";

export function PrescriptionsRoute() {
  return (
    <div className="container">
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>
            {patient.firstName} {patient.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}
