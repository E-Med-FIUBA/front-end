import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Prescription } from '@/types/api';

export default function PrescriptionViewModal({
  open,
  prescription,
  setOpen,
  setPrescription,
}: {
  open: boolean;
  prescription: Prescription | null;
  setOpen: (value: boolean) => void;
  setPrescription: (value: Prescription | null) => void;
}) {
  const onOpenChangeWrapper = (value: boolean) => {
    if (!value) {
      setPrescription(null);
    }
    setOpen(value);
  };

  const { patient } = prescription || {};
  if (!patient) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
      <DialogContent className="flex h-fit max-h-dvh max-w-lg flex-col">
        <DialogHeader>
          <DialogTitle>
            Prescripcion de {patient.name} {patient.lastName}
          </DialogTitle>
          <DialogDescription>Descripcion</DialogDescription>
        </DialogHeader>
        <ScrollArea className="overflow-y-auto" type="always"></ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
