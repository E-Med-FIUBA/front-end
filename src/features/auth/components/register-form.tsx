import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { FormInput } from '@/components/ui/form/form-input';
import { FormSelect } from '@/components/ui/form/form-select';
import { GradientShadow } from '@/components/ui/gradient-shadow';
import { SuccessModal } from '@/components/ui/success-modal';
import { getSpecialties } from '@/lib/api/specialty';
import { ApiClient, ApiError } from '@/lib/api-client';
import { UserData } from '@/lib/auth';
import { Specialty } from '@/types/api';

import { AuthFormFooter } from './auth-form-footer';
import { Label } from '@/components/ui/label';
import { IncompatibleKeyError } from '@/lib/signature/key_management';
import { Input } from '@/components/ui/input';

const registerSchema = z.object({
  firstName: z
    .string({
      message: 'El nombre es obligatorio',
    })
    .min(1, 'El nombre es obligatorio'),
  lastName: z
    .string({
      message: 'El apellido es obligatorio',
    })
    .min(1, 'El apellido es obligatorio'),
  email: z
    .string({
      message: 'El correo electronico es obligatorio',
    })
    .email({ message: 'Correo electronico invalido' }),
  password: z
    .string({
      message: 'La contraseña es obligatoria',
    })
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  license: z
    .string({
      message: 'La matricula es obligatoria',
    })
    .min(1, 'La matricula es obligatoria'),
  dni: z.coerce
    .number({
      message: 'El DNI debe ser un numero',
    })
    .int()
    .min(1000000, 'El DNI debe tener al menos 7 digitos')
    .max(99999999, 'El DNI debe tener como maximo 8 digitos'),
  specialtyId: z.string({
    message: 'La especialidad es obligatoria',
  }),
  certificate: z.instanceof(FileList).refine((files) => files.length > 0 && files[0].size > 0, {
    message: "Clave privada es requerida",
  }),

});


type RegisterFormInputs = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [specialties, setSpecialties] = useState<Array<Specialty>>([]);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSpecialties();
        setSpecialties(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const onValid: SubmitHandler<RegisterFormInputs> = async (data) => {
    setSubmitLoading(true);
    try {

      const certificate = await data.certificate?.[0]?.text();
      const reqData = {
        ...data,
        name: data.firstName,
        certificate
      };

      await ApiClient.post<UserData>('/auth/register/doctor', reqData);

      setIsSuccessModalOpen(true);
    } catch (error) {
      setSubmitLoading(false);
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else if (error instanceof IncompatibleKeyError) {
        toast.error(error.message);
      } else {
        toast.error(
          'El sistema se encuentra temporalmente fuera de servicio, aguarde unos minutos e intente nuevamente',
        );
      }
    }
  };

  return (
    <>
      <GradientShadow
        colors={['#009994', '#4c64ab', '#009994']}
        size={16}
        className="mx-auto max-w-sm"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Registro</CardTitle>
            <CardDescription>
              Ingresa tus datos para crear una cuenta nueva
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form
              onSubmitValid={(data) => {
                console.log('Schema values:', data);
                onValid(data);
              }}
              onSubmitInvalid={(errors, data) => {
                console.error('Schema validation errors:', errors);
                console.log('Current schema values:', data);
                toast.error('Por favor, corrige los errores en el formulario.');
              }}
              schema={registerSchema}
              className="grid gap-4"
            >
              {({ control, register }) => (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      control={control}
                      type="text"
                      placeholder="Nombre"
                      name="firstName"
                    />
                    <FormInput
                      control={control}
                      type="text"
                      placeholder="Apellido/s"
                      name="lastName"
                    />
                  </div>
                  <FormInput
                    control={control}
                    type="text"
                    placeholder="Correo electronico"
                    name="email"
                  />
                  <FormInput
                    control={control}
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                  />
                  <FormInput
                    control={control}
                    type="text"
                    placeholder="Matricula"
                    name="license"
                  />
                  <FormInput
                    control={control}
                    type="number"
                    placeholder="DNI"
                    name="dni"
                    hideArrows
                  />
                  <FormSelect
                    control={control}
                    placeholder="Selecciona una especialidad"
                    name="specialtyId"
                    items={specialties.map((specialty) => ({
                      label: specialty.name,
                      value: specialty.id.toString(),
                    }))}
                  />

                  <Label>Certificado</Label>

                  <Input
                    type="file"
                    placeholder="Clave privada"
                    {...register('certificate')}
                  ></Input>
                  <Button
                    type="submit"
                    className="w-full"
                    loading={submitLoading}
                  >
                    Crear cuenta
                  </Button>
                </>
              )}
            </Form>
            <AuthFormFooter
              to="/login"
              text="Ya tienes una cuenta?"
              linkText="Inicia sesion"
            />
          </CardContent>
        </Card>
      </GradientShadow>
      <SuccessModal
        open={isSuccessModalOpen}
        setOpen={setIsSuccessModalOpen}
        title="Creacion de cuenta en progreso"
        description="Tu cuenta esta siendo creada, en unos minutos recibirás un correo electronico
        confirmando que la cuenta fue creada con exito. Despues de eso podras iniciar sesion."
        onClose={() => navigate('/login')}
      />
    </>
  );
}
