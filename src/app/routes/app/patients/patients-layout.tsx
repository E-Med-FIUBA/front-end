import { Trash } from 'lucide-react';
import { useState } from 'react';
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Loader } from '@/components/ui/loader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ContentLayout } from '@/features/dashboard-layout/content-layout';
import AddPatientModal from '@/features/patients/components/add-patient-modal';
import { deletePatient, getPatients } from '@/features/patients/api';
import { useFetch } from '@/hooks/use-fetch';
import { Patient } from '@/types/api';
import { cn } from '@/utils/cn';

const PatientListItem = ({
  patient,
  setPatient,
  setOpen,
}: {
  patient: Patient;
  setPatient: (value: Patient) => void;
  setOpen: (value: boolean) => void;
}) => {
  const navigate = useNavigate();
  return (
    <li>
      <ContextMenu>
        <ContextMenuTrigger className="flex items-center justify-center rounded-md">
          <NavLink
            to={`/patients/${patient.id}`}
            onClick={() => setPatient(patient)}
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
          <ContextMenuItem
            inset
            onClick={() => {
              navigate(`/prescriptions?patientId=${patient.id}`);
            }}
          >
            Crear prescripción
          </ContextMenuItem>
          <ContextMenuItem
            inset
            onClick={() => navigate(`/history?patientId=${patient.id}`)}
          >
            Ver historial
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            inset
            className="font-medium text-destructive"
            onClick={() => {
              setPatient(patient);
              setOpen(true);
            }}
          >
            <Trash size={18} className="absolute left-2" />
            Eliminar a {patient.name} {patient.lastName}
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </li>
  );
};

const PatientList = ({
  showPatientsMobile,
  patients,
  loading,
  isModalOpen,
  setModalOpen,
  selectedPatient,
  setSelectedPatient: setSelectedPatient,
  refreshPatients,
}: {
  showPatientsMobile?: boolean;
  patients: Patient[];
  loading: boolean;
  isModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  selectedPatient: Patient | null;
  setSelectedPatient: (value: Patient | null) => void;
  refreshPatients: () => Promise<void>;
}) => {
  const navigate = useNavigate();
  const { patientId } = useParams();

  const handleDeletePatient = async () => {
    if (selectedPatient) {
      await deletePatient(selectedPatient.id);
      await refreshPatients();
    }

    if (patientId && patientId === selectedPatient?.id.toString())
      navigate('/patients');

    setSelectedPatient(null);
  };

  return (
    <>
      {loading ? (
        <div className="flex h-full flex-1 items-center justify-center rounded-md border bg-card">
          <Loader size={60} />
        </div>
      ) : (
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
            {patients.map((patient) => (
              <PatientListItem
                key={patient.id}
                patient={patient}
                setPatient={setSelectedPatient}
                setOpen={setModalOpen}
              />
            ))}
          </ul>
        </ScrollArea>
      )}
      <ConfirmationDialog
        title="¿Estás seguro de que deseas eliminar a este paciente?"
        confirmText="Eliminar"
        confirmVariant={'destructive'}
        description="Esta acción no se puede deshacer. Todos los datos relacionados con este paciente se eliminarán."
        open={isModalOpen}
        setOpen={setModalOpen}
        onConfirm={handleDeletePatient}
        onCancel={() => setSelectedPatient(null)}
      />
    </>
  );
};

export function PatientsLayout() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patient, setPatient] = useState<Patient | null>(null);
  const showPatientsMobile = location.pathname === '/patients';
  const { data: patients, loading, refresh } = useFetch<Patient[]>(getPatients);
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);

  return (
    <ContentLayout
      title="Pacientes"
      actions={
        <AddPatientModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          patient={patient}
          setPatient={setPatient}
          refreshPatients={refresh}
        />
      }
    >
      <div className="grid h-full grid-cols-4 gap-4">
        <PatientList
          showPatientsMobile={showPatientsMobile}
          patients={patients || []}
          loading={loading}
          isModalOpen={isDeletionModalOpen}
          setModalOpen={setIsDeletionModalOpen}
          selectedPatient={patient}
          setSelectedPatient={setPatient}
          refreshPatients={refresh}
        />
        <Outlet
          context={[setIsModalOpen, setIsDeletionModalOpen, setPatient]}
        />
      </div>
    </ContentLayout>
  );
}
