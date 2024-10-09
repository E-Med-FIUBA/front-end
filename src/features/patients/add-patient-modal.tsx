import { isValid, parse } from 'date-fns';
import { UserPlus } from 'lucide-react';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { FormDateInput } from '@/components/ui/form/form-date-input';
import { FormInput } from '@/components/ui/form/form-input';
import { FormSelect } from '@/components/ui/form/form-select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Patient } from '@/types/api';
import { Insurance } from '@/types/insurance.enum';
import { Sex } from '@/types/sex.enum';

const patientSchema = z.object({
  email: z
    .string({
      message: 'El correo electronico es requerido',
    })
    .email({
      message: 'Correo electronico invalido',
    }),
  dni: z.coerce
    .number({
      message: 'El DNI debe ser un numero',
    })
    .int({
      message: 'El DNI debe ser un numero entero',
    })
    .positive({
      message: 'El DNI debe ser un numero positivo',
    })
    .gt(1000000, {
      message: 'El DNI debe ser mayor a 1.000.000',
    }),
  name: z
    .string({
      message: 'El nombre es requerido',
    })
    .min(3, {
      message: 'El nombre debe tener al menos 3 caracteres',
    }),
  lastName: z
    .string({
      message: 'El apellido es requerido',
    })
    .min(3, {
      message: 'El apellido debe tener al menos 3 caracteres',
    }),
  birthDate: z
    .string({
      message: 'La fecha de nacimiento es requerida',
    })
    .refine(
      (value) => {
        const parsedFormatDesktop = parse(value, 'dd/MM/yyyy', new Date());
        const parsedFormatMobile = parse(value, 'yyyy-MM-dd', new Date());
        return isValid(parsedFormatDesktop) || isValid(parsedFormatMobile);
      },
      {
        message: 'La fecha de nacimiento debe ser una fecha valida',
      },
    ),
  afiliateNumber: z.coerce
    .number({
      message: 'El numero de afiliado debe ser un numero',
    })
    .int({
      message: 'El numero de afiliado debe ser un numero entero',
    })
    .positive({
      message: 'El numero de afiliado debe ser un numero positivo',
    }),
  insurance: z.nativeEnum(Insurance, {
    message: 'La obra social es requerida',
  }),
  sex: z.nativeEnum(Sex, {
    message: 'El sexo es requerido',
  }),
});

export default function AddPatientModal({
  patient,
  open,
  setOpen,
  setPatient,
}: {
  patient?: Patient;
  open: boolean;
  setOpen: (value: boolean) => void;
  setPatient: (value: Patient | undefined) => void;
}) {
  const onOpenChangeWrapper = (value: boolean) => {
    if (!value) setPatient(undefined);
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          <UserPlus size={18} className="mr-2" />
          Agregar paciente
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-fit max-h-dvh max-w-lg flex-col">
        <DialogHeader>
          <DialogTitle>Agregar nuevo paciente</DialogTitle>
          <DialogDescription>
            Ingrese los datos del paciente para agregarlo a la lista de
            pacientes registrados.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="overflow-y-auto" type="always">
          <Form
            onSubmitValid={() => {}}
            schema={patientSchema}
            className="mb-4 flex flex-col gap-2 px-2"
            options={{
              defaultValues: patient,
            }}
          >
            {({ control }) => (
              <>
                <div className="grid gap-2 sm:grid-cols-2">
                  <FormInput
                    type="text"
                    label="Nombre"
                    control={control}
                    name={'name'}
                  />
                  <FormInput
                    type="text"
                    label="Apellido"
                    control={control}
                    name={'lastName'}
                  />
                </div>
                <FormInput
                  type="email"
                  label="Correo electronico"
                  control={control}
                  name={'email'}
                />
                <div className="grid gap-2 sm:grid-cols-2">
                  <FormInput
                    type="number"
                    label="DNI"
                    control={control}
                    name={'dni'}
                  />
                  <FormDateInput
                    name={'birthDate'}
                    control={control}
                    label="Fecha de nacimiento"
                  />
                </div>
                <FormSelect
                  control={control}
                  name="sex"
                  label="Sexo"
                  items={[
                    { value: Sex.MALE, label: 'Masculino' },
                    { value: Sex.FEMALE, label: 'Femenino' },
                    { value: Sex.OTHER, label: 'Otro' },
                  ]}
                  placeholder={'Selecciona el sexo del paciente'}
                />
                <div className="grid gap-2 sm:grid-cols-2">
                  <FormSelect
                    label="Obra social"
                    name={'insurance'}
                    placeholder="Seleccione una obra social"
                    control={control}
                    items={[
                      { label: 'OSDE', value: Insurance.OSDE },
                      { label: 'Swiss Medical', value: Insurance.SwissMedical },
                      { label: 'Galeno', value: Insurance.Galeno },
                    ]}
                  />
                  <FormInput
                    type="number"
                    label="Numero de afiliado"
                    control={control}
                    name={'afiliateNumber'}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">Crear paciente</Button>
                </DialogFooter>
              </>
            )}
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
