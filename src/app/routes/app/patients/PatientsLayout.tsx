import { NavLink, Outlet, useLocation } from "react-router-dom";

import { ContentLayout } from "@/components/layouts/ContentLayout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { patientsMock } from "@/testing/mocks/patients";
import { Patient } from "@/types/api";
import { cn } from "@/utils/cn";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Trash } from "lucide-react";
import AddPatientModal from "@/features/patients/AddPatientModal";

const PatientListItem = ({ patient }: { patient: Patient }) => (
  <li>
    <ContextMenu>
      <ContextMenuTrigger className="flex items-center justify-center rounded-md">
        <NavLink
          to={`/patients/${patient.id}`}
          className="flex items-center gap-4 p-2 hover:bg-muted/60 dark:hover:bg-muted/20 w-full select-none"
          draggable={false}
        >
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
        </NavLink>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset>Crear receta</ContextMenuItem>
        <ContextMenuItem inset>Ver historial</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset className="text-destructive font-medium">
          <Trash size={18} className="absolute left-2" />
          Eliminar a {patient.firstName} {patient.lastName}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  </li>
);

const PatientList = ({
  showPatientsMobile,
}: {
  showPatientsMobile?: boolean;
}) => (
  <ScrollArea
    className={cn(
      "h-full bg-card rounded-md border col-span-4 xl:col-span-1",
      showPatientsMobile
        ? "flex flex-col gap-2"
        : "hidden xl:flex flex-col gap-2"
    )}
    type="always"
  >
    <ul>
      {patientsMock.map((patient) => (
        <PatientListItem key={patient.id} patient={patient} />
      ))}
    </ul>
  </ScrollArea>
);

export function PatientsLayout() {
  const location = useLocation();

  const showPatientsMobile = location.pathname === "/patients";

  return (
    <ContentLayout title="Pacientes" actions={<AddPatientModal />}>
      <div className="grid h-full grid-cols-4 gap-4">
        <PatientList showPatientsMobile={showPatientsMobile} />
        <Outlet />
      </div>
    </ContentLayout>
  );
}
