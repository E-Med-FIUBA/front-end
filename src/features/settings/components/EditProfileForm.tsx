import { z } from "zod";

import { Form } from "@/components/ui/Form";
import { FormInput } from "@/components/ui/Form/FormInput";
import { FormSelect } from "@/components/ui/Form/FormSelect";
import { Button } from "@/components/ui/button";

const editProfileSchema = z.object({
  email: z
    .string({
      message: "El correo electronico es requerido",
    })
    .email({
      message: "Correo electronico invalido",
    })
    .optional(),
  dni: z.coerce
    .number({
      message: "El DNI debe ser un numero",
    })
    .int({
      message: "El DNI debe ser un numero entero",
    })
    .positive({
      message: "El DNI debe ser un numero positivo",
    })
    .gt(1000000, {
      message: "El DNI debe ser mayor a 1.000.000",
    })
    .optional(),
  firstName: z
    .string({
      message: "El nombre es requerido",
    })
    .min(3, {
      message: "El nombre debe tener al menos 3 caracteres",
    })
    .optional(),
  lastName: z
    .string({
      message: "El apellido es requerido",
    })
    .min(3, {
      message: "El apellido debe tener al menos 3 caracteres",
    })
    .optional(),
  specialty: z
    .string({
      message: "La especialidad es requerida",
    })
    .min(3, {
      message: "La especialidad debe tener al menos 3 caracteres",
    })
    .optional(),
  address: z
    .string({
      message: "El domicilio es requerido",
    })
    .min(3, {
      message: "El domicilio debe tener al menos 3 caracteres",
    })
});

export function EditProfileForm() {
  return (
    <Form
      schema={editProfileSchema}
      onSubmitValid={(data) => {
        console.log(data);
      }}
      className="max-w-sm mx-auto grid grid-cols-1 gap-4"
      options={{
        defaultValues: {
          firstName: "Juan",
          lastName: "Perez",
          email: "juan.perez@mail.com",
          dni: 12345678,
          specialty: "cardiologo",
          address: "Calle falsa 123",
        },
      }}
    >
      {({ control }) => (
        <>
          <FormInput
            type="text"
            label="Nombre"
            control={control}
            name="firstName"
          />
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
            name="specialty"
            items={[
              { value: "cardiologo", label: "Cardiologo" },
              { value: "neurologo", label: "Neurologo" },
              { value: "pediatra", label: "Pediatra" },
              { value: "otorrino", label: "Otorrino" },
            ]}
            placeholder="Selecciona una especialidad"
          />
          <FormInput
            type="text"
            label="Domicilio"
            control={control}
            name="address"
          />

          <Button type="submit">Editar perfil</Button>
        </>
      )}
    </Form>
  );
}
