import { z } from "zod";

import { Form } from "@/components/ui/Form";
import { LabeledCombobox } from "@/components/ui/Form/LabeledCombobox";
import { LabeledDatePicker } from "@/components/ui/Form/LabeledDatePicker";
import { LabeledInput } from "@/components/ui/Form/LabeledInput";
import { LabeledSelect } from "@/components/ui/Form/LabeledSelect";
import { LabeledTextarea } from "@/components/ui/Form/LabeledTextArea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

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
});

export function PrescriptionForm() {
  return (
    <Card className="w-full">
      <CardHeader>
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
              <LabeledInput
                type="text"
                label="Nombre"
                placeholder="Juan"
                {...register("firstName")}
                error={formState.errors.firstName}
              />
              <LabeledInput
                type="text"
                label="Apellido/s"
                placeholder="Lopez Perez"
                {...register("lastName")}
                error={formState.errors.lastName}
                containerClassName="col-span-2"
              />

              <LabeledInput
                type="text"
                label="Correo electronico"
                placeholder="juan.perez@email.com"
                {...register("email")}
                error={formState.errors.email}
                containerClassName="col-span-3"
              />

              <LabeledInput
                type="text"
                label="DNI"
                placeholder="12345678"
                {...register("dni")}
                error={formState.errors.dni}
              />
              <LabeledDatePicker
                label="Fecha de nacimiento"
                containerClassName="col-span-1 w-full"
              />
              <LabeledSelect
                label="Sexo"
                id="sex"
                items={["Masculino", "Femenino", "Otro"]}
              />

              <LabeledCombobox
                label="Medicamento"
                items={[
                  { label: "Ibuprofeno", value: "ibuprofeno" },
                  { label: "Paracetamol", value: "paracetamol" },
                ]}
              />
              <LabeledCombobox
                label="Presentacion"
                items={[
                  {
                    label: "Caja de 20 comprimidos",
                    value: "caja de 20 comprimidos",
                  },
                  {
                    label: "Caja de 10 comprimidos",
                    value: "caja de 10 comprimidos",
                  },
                ]}
              />
              <LabeledInput
                type="number"
                label="Unidades"
                placeholder="Unidades"
                {...register("units")}
                error={formState.errors.units}
                hideArrows
              />
              <LabeledSelect
                label="Obra social"
                id="insurance"
                items={["OSDE", "Swiss Medical", "Galeno"]}
              />
              <LabeledInput
                type="text"
                label="Numero de afiliado"
                placeholder="1-234567-8"
                containerClassName="col-span-2"
              />
              <LabeledTextarea
                label="Diagnostico"
                placeholder="Escriba su diagnostico aqui"
                containerClassName="col-span-3"
                disableResize
              />
              <Button type="submit" className="col-span-3">
                Enviar
              </Button>
            </>
          )}
        </Form>
      </CardContent>
    </Card>
  );
}
