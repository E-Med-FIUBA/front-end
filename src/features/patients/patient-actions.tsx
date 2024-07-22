import { Edit, Ellipsis, Trash2 } from 'lucide-react';

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
  setPatient,
}: {
  setIsModalOpen: (value: boolean) => void;
  setPatient: () => void;
}) {
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
          onClick={() => {
            setPatient();
            setIsModalOpen(true);
          }}
        >
          <Edit className="size-4" />
          <span>Editar Paciente</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex cursor-pointer items-center gap-2 font-bold !text-destructive">
          <Trash2 className="size-4" />
          <span>Eliminar Paciente</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
