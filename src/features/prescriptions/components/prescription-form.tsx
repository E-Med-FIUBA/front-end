import { isValid, parse, differenceInYears, format } from 'date-fns';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { DisplayInput } from '@/components/ui/form/display-input';
import { FormCombobox } from '@/components/ui/form/form-combobox';
import { FormDateInput } from '@/components/ui/form/form-date-input';
import { FormInput } from '@/components/ui/form/form-input';
import { FormSelect } from '@/components/ui/form/form-select';
import { FormTextarea } from '@/components/ui/form/form-textarea';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/ui/loader';
import { useFetch } from '@/hooks/use-fetch';
import { getInsuranceCompanies, getPatient } from '@/lib/api/patients';
import { Patient } from '@/types/api';
import { Insurance } from '@/types/insurance.enum';
import { Sex } from '@/types/sex.enum';

const getAge = (date: string) => {
  if (!date) return '';
  const parsedFormatDesktop = parse(date, 'dd/MM/yyyy', new Date());
  const parsedFormatMobile = parse(date, 'yyyy-MM-dd', new Date());
  const parsedDate = isValid(parsedFormatDesktop)
    ? parsedFormatDesktop
    : parsedFormatMobile;
  if (!isValid(parsedDate)) return '';
  const age = differenceInYears(new Date(), parsedDate);
  return `${age} año${age === 1 ? '' : 's'}`;
};

const prescriptionSchema = z.object({
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
  firstName: z
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
  units: z.coerce
    .number({
      message: 'Las unidades deben ser un numero',
    })
    .int({
      message: 'Las unidades deben ser un numero entero',
    })
    .positive({
      message: 'Las unidades deben ser un numero positivo',
    }),
  affiliateNumber: z.coerce
    .number({
      message: 'El numero de afiliado debe ser un numero',
    })
    .int({
      message: 'El numero de afiliado debe ser un numero entero',
    })
    .positive({
      message: 'El numero de afiliado debe ser un numero positivo',
    }),
  insuranceCompanyId: z.nativeEnum(Insurance, {
    message: 'La obra social es requerida',
  }),
  sex: z.nativeEnum(Sex, {
    message: 'El sexo es requerido',
  }),
  presentation: z.string({
    message: 'La presentacion es requerida',
  }),
  diagnosis: z.string({
    message: 'El diagnostico es requerido',
  }),
  medication: z.string({
    message: 'El medicamento es requerido',
  }),
});

export function PrescriptionForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const patientId = searchParams.get('patientId');
  const { data: patient, loading: loadingPatient } = useFetch<Patient | null>(
    useCallback(() => {
      if (!patientId) return Promise.resolve(null);
      return getPatient(patientId);
    }, [patientId]),
  );
  const { data: insuranceCompanies, loading: loadingCompanies } = useFetch(
    getInsuranceCompanies,
  );

  const isSaved = !!patient;

  if (loadingPatient || loadingCompanies) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader size={60} />
      </div>
    );
  }

  if (!isSaved && patientId) {
    setSearchParams({});
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Crear prescripcion</CardTitle>
        <CardDescription>
          Ingresa los datos del paciente para crear una prescripcion y enviarla
          por correo electronico
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form
          schema={prescriptionSchema}
          onSubmitValid={(data) => {
            console.log(data);
          }}
          options={{
            defaultValues: {
              ...(patient
                ? {
                    ...patient,
                    insuranceCompanyId: patient.insuranceCompany.id.toString(),
                  }
                : {
                    email: '',
                    dni: '',
                    firstName: '',
                    lastName: '',
                    birthDate: '',
                    affiliateNumber: '',
                    insuranceCompanyId: '',
                  }),
              diagnosis: '',
              medication: '',
              presentation: '',
              units: '',
            },
          }}
          className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3"
        >
          {({ control, watch, formState }) => (
            <>
              <FormInput
                type="text"
                label="Apellido/s"
                control={control}
                name={'lastName'}
                disabled={isSaved}
              />
              <FormInput
                type="text"
                label="Nombre"
                control={control}
                name={'name'}
                disabled={isSaved}
              />
              <FormInput
                type="number"
                label="DNI"
                control={control}
                name={'dni'}
                hideArrows
                disabled={isSaved}
              />
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
                disabled={isSaved}
              />
              <div className="grid grid-cols-3 gap-2">
                <FormDateInput
                  name={'birthDate'}
                  control={control}
                  label="Fecha de nacimiento"
                  containerClassName="col-span-2"
                  min="01/01/1900"
                  max={format(new Date(), 'dd/MM/yyyy')}
                  disabled={isSaved}
                />
                <DisplayInput
                  label="Edad"
                  className={formState.errors.birthDate && 'text-destructive'}
                >
                  <Input
                    type="text"
                    value={getAge(watch('birthDate'))}
                    disabled
                  />
                </DisplayInput>
              </div>
              <FormInput
                type="email"
                label="Correo electronico"
                control={control}
                name={'email'}
                autoComplete="email"
                disabled={isSaved}
              />
              <FormSelect
                control={control}
                name="insuranceCompanyId"
                label="Obra social"
                items={
                  insuranceCompanies?.map((company) => ({
                    value: company.id.toString(),
                    label: company.name,
                  })) || []
                }
                placeholder={'Selecciona una obra social'}
                disabled={isSaved}
              />
              <FormInput
                type="number"
                label="Numero de afiliado"
                control={control}
                name={'affiliateNumber'}
                hideArrows
                disabled={isSaved}
              />
              <FormTextarea
                control={control}
                name="diagnosis"
                label="Diagnostico"
                disableResize
                containerClassName="row-span-2 flex flex-col mt-1.5 gap-1"
                className="flex-1"
              />

              <FormCombobox
                control={control}
                name="medication"
                label="Medicamento"
                items={[
                  { value: 'ibuprofeno', label: 'Ibuprofeno' },
                  { value: 'paracetamol', label: 'Paracetamol' },
                  { value: 'amoxicilina', label: 'Amoxicilina' },
                ]}
                placeholder={'Selecciona un medicamento'}
                emptyMessage={'No se encontraron medicamentos'}
              />
              <div className="grid grid-cols-3 gap-2">
                <FormSelect
                  control={control}
                  name="presentation"
                  label="Presentacion"
                  items={[
                    { value: '20 comprimidos', label: '20 Comprimidos' },
                    { value: '30 comprimidos', label: '30 Comprimidos' },
                    { value: '40 comprimidos', label: '40 Comprimidos' },
                  ]}
                  placeholder={'Selecciona la presentacion'}
                  containerClassName="col-span-2"
                />
                <FormInput
                  type="number"
                  label="Unidades"
                  control={control}
                  name={'units'}
                  hideArrows
                />
              </div>

              <Button type="submit" className="col-span-1 lg:col-span-3">
                Crear prescripcion
              </Button>
            </>
          )}
        </Form>
      </CardContent>
    </Card>
  );
}
