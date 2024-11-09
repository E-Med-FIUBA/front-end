import { format, parseISO } from 'date-fns';
import { Info, Pill, Text, User } from 'lucide-react';
import { ReactNode } from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Prescription } from '@/types/api';
import { Sex } from '@/types/sex.enum';

const Section = ({
  title,
  items,
  icon,
  content,
  className,
}: {
  title: string;
  icon: React.ReactNode;
  items?: { label: string; value: string | ReactNode }[];
  content?: string;
  className?: string;
}) => (
  <div className={className}>
    <div className="flex items-center gap-2">
      {icon} <span className="text-lg font-semibold">{title}</span>
    </div>
    <div className="grid grid-cols-[auto,1fr] items-center gap-x-4 gap-y-2 text-sm mt-1">
      {items?.map(({ label, value }) => (
        <>
          <span className="align-middle  text-muted-foreground">{label}:</span>
          <span>{value}</span>
        </>
      ))}
    </div>
    <span>{content}</span>
  </div>
);

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
      <DialogContent className="flex h-fit max-h-dvh max-w-md flex-col">
        <DialogHeader>
          <DialogTitle className="flex justify-between text-xl">
            Detalles de Prescripcion
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="overflow-y-auto" type="always">
          <div className="flex flex-col gap-y-8">
            <Section
              title="Informacion del Paciente"
              icon={<User size={22} />}
              items={[
                {
                  label: 'Nombre',
                  value: `${patient.name} ${patient.lastName}`,
                },
                { label: 'DNI', value: patient.dni.toString() },
                { label: 'Email', value: patient.email },
                { label: 'Obra Social', value: patient.insuranceCompany.name },
                {
                  label: 'Numero de Afiliado',
                  value: patient.affiliateNumber.toString(),
                },
                {
                  label: 'Sexo',
                  value:
                    patient.sex === Sex.MALE
                      ? 'Masculino'
                      : patient.sex === Sex.FEMALE
                        ? 'Femenino'
                        : 'Otro',
                },
              ]}
            />
            <Section
              title="Medicamento"
              icon={<Pill size={22} />}
              items={[
                {
                  label: 'Nombre',
                  value: prescription?.presentation.drug?.name || '',
                },
                {
                  label: 'Presentacion',
                  value: prescription?.presentation.name || '',
                },
              ]}
            />
            <Section
              title="Diagnostico"
              icon={<Text size={22} />}
              content={prescription?.indication}
            />
            <Section
              title="Estado"
              icon={<Info size={22} />}
              items={[
                {
                  label: 'Fecha de Creacion',
                  value: prescription
                    ? format(parseISO(prescription?.emitedAt), 'dd/MM/yyyy')
                    : '',
                },
                {
                  label: 'Estado actual',
                  value: prescription?.used ? (
                    <Badge variant={'destructive'}>Usada</Badge>
                  ) : (
                    <Badge variant={'default'}>No usada</Badge>
                  ),
                },
              ]}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
