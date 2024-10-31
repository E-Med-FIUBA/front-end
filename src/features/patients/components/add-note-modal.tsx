import { toast } from 'react-toastify';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { FormTextarea } from '@/components/ui/form/form-textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { editPatientNote } from '@/lib/api/patient-notes';
import { Patient, PatientNote } from '@/types/api';

import { createPatientNote } from '../api';

const noteSchema = z.object({
  description: z
    .string()
    .min(1, { message: 'La descripción no puede estar vacía' }),
});

const defaultValues = {
  description: '',
};

export default function AddNoteModal({
  patient,
  open,
  note,
  setOpen,
  setPatient,
  setNote,
  refreshNotes,
}: {
  patient: Patient | null;
  open: boolean;
  note: PatientNote | null;
  setOpen: (value: boolean) => void;
  setPatient: (value: Patient | null) => void;
  setNote: (value: PatientNote | null) => void;
  refreshNotes: () => Promise<void>;
}) {
  const onOpenChangeWrapper = (value: boolean) => {
    if (!value) {
      setPatient(null);
      setNote(null);
    }
    setOpen(value);
  };

  const isEdit = !!note;

  return (
    <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
      <DialogContent className="flex h-fit max-h-dvh max-w-lg flex-col">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Editar' : 'Crear'} nota para {patient?.name}{' '}
            {patient?.lastName}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Ingrese la descripción de la nota que desea editar.'
              : 'Ingrese la descripción de la nota que desea agregar al paciente.'}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="overflow-y-auto" type="always">
          <Form
            onSubmitValid={async (values) => {
              try {
                if (isEdit) {
                  await editPatientNote(note!.id, values.description);
                } else {
                  await createPatientNote(patient!.id, values.description);
                }
                await refreshNotes();
              } catch (error) {
                console.error(error);
                toast.error('Error al crear la nota');
              }
              setNote(null);
              setPatient(null);
              setOpen(false);
            }}
            schema={noteSchema}
            className="mb-4 flex flex-col gap-2 px-2"
            options={{
              defaultValues: isEdit
                ? {
                    description: note?.note,
                  }
                : defaultValues,
            }}
          >
            {({ control }) => (
              <>
                <FormTextarea
                  label="Descripción"
                  control={control}
                  name={'description'}
                  className="min-h-72"
                />

                <DialogFooter className="mt-2">
                  <Button type="submit">
                    {isEdit ? 'Editar' : 'Crear'} nota
                  </Button>
                </DialogFooter>
              </>
            )}
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
