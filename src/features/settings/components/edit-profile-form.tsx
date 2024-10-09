import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormInput } from '@/components/ui/form/form-input';
import { FormSelect } from '@/components/ui/form/form-select';
import { Loader } from '@/components/ui/loader';
import { getSpecialties } from '@/lib/api/specialty';
import { Specialty, User } from '@/types/api';

import { getMe, updateMe } from '../api';

const editProfileSchema = z.object({
  email: z
    .string({
      message: 'El correo electronico es requerido',
    })
    .email({
      message: 'Correo electronico invalido',
    })
    .optional(),
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
    })
    .optional(),
  name: z
    .string({
      message: 'El nombre es requerido',
    })
    .min(3, {
      message: 'El nombre debe tener al menos 3 caracteres',
    })
    .optional(),
  lastName: z
    .string({
      message: 'El apellido es requerido',
    })
    .min(3, {
      message: 'El apellido debe tener al menos 3 caracteres',
    })
    .optional(),
  specialtyId: z
    .string({
      message: 'La especialidad es requerida',
    })
    .optional(),
});

export function EditProfileForm() {
  const [me, setMe] = useState<User | null>(null);
  const [specialties, setSpecialties] = useState<Array<Specialty>>([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [meData, specialtiesData] = await Promise.all([
          getMe(),
          getSpecialties(),
        ]);
        setMe(meData);
        setSpecialties(specialtiesData);
      } catch (error) {
        toast.error(
          'Hubo un error al cargar los datos, por favor intente nuevamente',
        );
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loader size={60} />;
  }

  return (
    <Form
      schema={editProfileSchema}
      onSubmitValid={async (data) => {
        setSubmitLoading(true);
        try {
          await updateMe(data);
          toast.success('Perfil actualizado correctamente');
          navigate(-1);
        } catch (error) {
          toast.error('Hubo un error al actualizar el perfil');
          console.error(error);
          setSubmitLoading(false);
        }
      }}
      className="mx-auto grid max-w-sm grid-cols-1 gap-4"
      options={{
        defaultValues: {
          name: me?.name,
          lastName: me?.lastName,
          email: me?.email,
          dni: me?.dni,
          specialtyId: me?.doctor?.specialtyId.toString(),
        },
      }}
    >
      {({ control }) => (
        <>
          <FormInput type="text" label="Nombre" control={control} name="name" />
          <FormInput
            type="text"
            label="Apellido/s"
            control={control}
            name="lastName"
          />
          <FormInput
            type="email"
            label="Correo electronico"
            control={control}
            name="email"
            autoComplete="email"
          />
          <FormInput
            type="number"
            label="DNI"
            control={control}
            name="dni"
            hideArrows
          />
          <FormSelect
            label="Especialidad"
            control={control}
            name="specialtyId"
            items={specialties.map((specialty) => ({
              label: specialty.name,
              value: specialty.id.toString(),
            }))}
            placeholder="Selecciona una especialidad"
          />

          <Button type="submit" loading={submitLoading}>
            Editar perfil
          </Button>
        </>
      )}
    </Form>
  );
}
