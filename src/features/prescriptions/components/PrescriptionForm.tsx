import { Form } from "@/components/ui/Form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";

const prescriptionSchema = z.object({
  email: z.string().email({
    message: "Correo electronico invalido",
  }),
  dni: z
    .string()
    .length(8, {
      message: "El DNI debe tener 8 digitos",
    })
    .refine(
      (value) => {
        return !isNaN(Number(value));
      },
      {
        message: "El DNI debe ser un numero",
      }
    ),
  name: z.string().min(3, {
    message: "El nombre debe tener al menos 3 caracteres",
  }),
});

export function PrescriptionForm() {
  return (
    <Form
      schema={prescriptionSchema}
      onSubmit={() => {
        console.log("hola");
      }}
      className="w-full max-w-96 mx-2"
    >
      {({ register, formState }) => (
        <>
          <Input
            type="text"
            placeholder="Correo electronico"
            {...register("email")}
            error={formState.errors.email}
          />
          <Input
            type="text"
            placeholder="DNI"
            {...register("dni")}
            error={formState.errors.dni}
          />
          <Input
            type="text"
            placeholder="Nombre"
            {...register("name")}
            error={formState.errors.name}
          />
          <Button type="submit">Enviar</Button>
        </>
      )}
    </Form>
  );
}
