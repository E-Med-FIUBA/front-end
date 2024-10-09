import { Trash } from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ContentLayout } from '@/features/dashboard-layout/content-layout';
import AddPatientModal from '@/features/patients/add-patient-modal';
import { patientsMock } from '@/testing/mocks/patients';
import { Patient } from '@/types/api';
import { cn } from '@/utils/cn';

const PatientListItem = ({ patient }: { patient: Patient }) => (
  <li>
    <ContextMenu>
      <ContextMenuTrigger className="flex items-center justify-center rounded-md">
        <NavLink
          to={`/patients/${patient.id}`}
          className="flex w-full select-none items-center gap-4 p-2 transition-all duration-100 ease-in-out hover:bg-muted/60 active:bg-muted/90 dark:hover:bg-muted/20 dark:active:bg-muted/30"
          draggable={false}
        >
          <Avatar>
            <AvatarFallback>
              {patient.name[0]}
              {patient.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">
              {patient.name} {patient.lastName}
            </h3>
            <p className="text-sm">DNI: 12345678</p>
          </div>
        </NavLink>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset>Crear receta</ContextMenuItem>
        <ContextMenuItem inset>Ver historial</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset className="font-medium text-destructive">
          <Trash size={18} className="absolute left-2" />
          Eliminar a {patient.name} {patient.lastName}
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
      'h-full bg-card rounded-md border col-span-4 xl:col-span-1',
      showPatientsMobile
        ? 'flex flex-col gap-2'
        : 'hidden xl:flex flex-col gap-2',
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  const showPatientsMobile = location.pathname === '/patients';

  return (
    <ContentLayout
      title="Pacientes"
      actions={
        <AddPatientModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          patient={patient}
          setPatient={setPatient}
        />
      }
    >
      <div className="grid h-full grid-cols-4 gap-4">
        <PatientList showPatientsMobile={showPatientsMobile} />
        <Outlet context={[setIsModalOpen, setPatient]} />
      </div>
    </ContentLayout>
  );
}
