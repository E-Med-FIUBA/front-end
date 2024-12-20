import {
  Edit,
  Ellipsis,
  FilePlus,
  History,
  NotepadText,
  Trash2,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function PatientActions({
  setIsModalOpen,
  setIsDeletionModalOpen,
  setIsNoteModalOpen,
  setPatient,
}: {
  setIsModalOpen: (value: boolean) => void;
  setIsDeletionModalOpen: (value: boolean) => void;
  setIsNoteModalOpen: (value: boolean) => void;
  setPatient: () => void;
}) {
  const { patientId } = useParams();
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => navigate(`/prescriptions?patientId=${patientId}`)}
        >
          <NotepadText className="size-4" />
          <span>Crear Prescripción</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => {
            setPatient();
            setIsNoteModalOpen(true);
          }}
        >
          <FilePlus className="size-4" />
          <span>Añadir Nota</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => navigate(`/history?patientId=${patientId}`)}
        >
          <History className="size-4" />
          <span>Ver Historial</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => {
            setPatient();
            setIsModalOpen(true);
          }}
        >
          <Edit className="size-4" />
          <span>Editar Paciente</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-2 font-bold !text-destructive"
          onClick={() => {
            setPatient();
            setIsDeletionModalOpen(true);
          }}
        >
          <Trash2 className="size-4" />
          <span>Eliminar Paciente</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
