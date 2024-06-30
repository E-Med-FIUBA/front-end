import { ContentLayout } from "@/components/layouts/ContentLayout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { patientsMock } from "@/testing/mocks/patients";

const Patient = (patient: { firstName: string; lastName: string }) => (
  <li className="flex items-center gap-4 p-2 hover:bg-gray-100">
    <Avatar>
      <AvatarFallback>
        {patient.firstName[0]}
        {patient.lastName[0]}
      </AvatarFallback>
    </Avatar>
    <div>
      <h3 className="text-lg font-semibold">
        {patient.firstName} {patient.lastName}
      </h3>
      <p className="text-sm text-gray-500">DNI: 12345678</p>
    </div>
  </li>
);

export function PatientsRoute() {
  return (
    <ContentLayout title="Pacientes">
      <div className="flex h-full justify-start bg-background rounded-md shadow">
        <ul className="flex flex-col gap-2 w-80 border-r">
          <ScrollArea>
            {patientsMock.map((patient) => (
              <Patient
                key={patient.id}
                firstName={patient.firstName}
                lastName={patient.lastName}
              />
            ))}
          </ScrollArea>
        </ul>
      </div>
    </ContentLayout>
  );
}
