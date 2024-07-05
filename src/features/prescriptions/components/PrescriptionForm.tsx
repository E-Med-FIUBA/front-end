import { z } from "zod";

import { Form } from "@/components/ui/Form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { FormInput } from "@/components/ui/Form/FormInput";
import { Button } from "@/components/ui/button";

const prescriptionSchema = z.object({
  email: z.string().email({
    message: "Correo electronico invalido",
  }),
  dni: z.coerce
    .number()
    .int({
      message: "El DNI debe ser un numero entero",
    })
    .positive({
      message: "El DNI debe ser un numero positivo",
    })
    .gt(1000000, {
      message: "El DNI debe ser mayor a 1.000.000",
    }),
  firstName: z.string().min(3, {
    message: "El nombre debe tener al menos 3 caracteres",
  }),
  lastName: z.string().min(3, {
    message: "El apellido debe tener al menos 3 caracteres",
  }),
  dateOfBirth: z.string().refine(
    (value) => {
      return !isNaN(Date.parse(value));
    },
    {
      message: "La fecha de nacimiento debe ser una fecha valida",
    }
  ),
  units: z.coerce
    .number()
    .int({
      message: "Las unidades deben ser un numero entero",
    })
    .positive({
      message: "Las unidades deben ser un numero positivo",
    }),
  afiliateNumber: z.coerce
    .number()
    .int({
      message: "El numero de afiliado debe ser un numero entero",
    })
    .positive({
      message: "El numero de afiliado debe ser un numero positivo",
    }),
});

export function PrescriptionForm() {
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
          onSubmit={() => {
            console.log("hola");
          }}
          className="w-full grid grid-cols-3 gap-4"
        >
          {({ register, formState }) => (
            <>
              {" "}
              <FormInput
                id="firstName"
                type="text"
                label="Nombre"
                registration={register("firstName")}
                error={formState.errors.firstName}
              />
              <FormInput
                id="lastName"
                type="text"
                label="Apellido/s"
                registration={register("lastName")}
                error={formState.errors.lastName}
              />
              <FormInput
                id="email"
                type="email"
                label="Correo electronico"
                registration={register("email")}
                error={formState.errors.email}
              />
              <FormInput
                id="dni"
                type="number"
                label="DNI"
                registration={register("dni")}
                error={formState.errors.dni}
                hideArrows
              />
               <FormInput
                id="units"
                type="number"
                label="Unidades"
                registration={register("units")}
                error={formState.errors.units}
                hideArrows
              />
              <FormInput
                id="afiliateNumber"
                type="number"
                label="Numero de afiliado"
                registration={register("afiliateNumber")}
                error={formState.errors.afiliateNumber}
                hideArrows
              />
              <Button type="submit" className="col-span-3">
                Crear prescripcion
              </Button>
            </>
          )}
        </Form>
      </CardContent>
    </Card>
  );
}
