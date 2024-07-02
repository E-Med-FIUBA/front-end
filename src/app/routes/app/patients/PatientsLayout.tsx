import { ContentLayout } from "@/components/layouts/ContentLayout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { patientsMock } from "@/testing/mocks/patients";
import { cn } from "@/utils/cn";
import { Outlet, useLocation } from "react-router-dom";

const Patient = (patient: { firstName: string; lastName: string }) => (
  <li className="flex items-center gap-4 p-2 hover:bg-muted/60 dark:hover:bg-muted/20">
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
      <p className="text-sm">DNI: 12345678</p>
    </div>
  </li>
);

const PatientList = ({
  showPatientsMobile,
}: {
  showPatientsMobile?: boolean;
}) => (
  <ScrollArea
    className={cn(
      "h-full bg-card rounded-md border col-span-1",
      showPatientsMobile
        ? "flex flex-col gap-2"
        : "hidden xl:flex flex-col gap-2"
    )}
    type="always"
  >
    <ul>
      {patientsMock.map((patient) => (
        <Patient
          key={patient.id}
          firstName={patient.firstName}
          lastName={patient.lastName}
        />
      ))}
    </ul>
  </ScrollArea>
);

export function PatientsLayout() {
  const location = useLocation();

  const showPatientsMobile = location.pathname === "/patients";

  return (
    <ContentLayout title="Pacientes">
      <div className="block xl:grid h-full grid-cols-4 gap-4">
        <PatientList showPatientsMobile={showPatientsMobile} />
        <Outlet />
      </div>
    </ContentLayout>
  );
}
