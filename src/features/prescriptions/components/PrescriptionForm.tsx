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
import { FormSelect } from "@/components/ui/Form/FormSelect";
import { Button } from "@/components/ui/button";
import { Insurance } from "@/types/insurance.enum";
import { Sex } from "@/types/sex.enum";
import { FormTextarea } from "@/components/ui/Form/FormTextarea";
import { FormCombobox } from "@/components/ui/Form/FormCombobox";
import { FormDateInput } from "@/components/ui/Form/FormDateInput";
import { isValid, parse } from "date-fns";

const prescriptionSchema = z.object({
  email: z
    .string({
      message: "El correo electronico es requerido",
    })
    .email({
      message: "Correo electronico invalido",
    }),
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
    }),
  firstName: z
    .string({
      message: "El nombre es requerido",
    })
    .min(3, {
      message: "El nombre debe tener al menos 3 caracteres",
    }),
  lastName: z
    .string({
      message: "El apellido es requerido",
    })
    .min(3, {
      message: "El apellido debe tener al menos 3 caracteres",
    }),
  dateOfBirth: z
    .string({
      message: "La fecha de nacimiento es requerida",
    })
    .refine(
      (value) => {
        const parsedFormatDesktop = parse(value, "dd/MM/yyyy", new Date());
        const parsedFormatMobile = parse(value, "yyyy-MM-dd", new Date());
        return isValid(parsedFormatDesktop) || isValid(parsedFormatMobile);
      },
      {
        message: "La fecha de nacimiento debe ser una fecha valida",
      }
    ),
  units: z.coerce
    .number({
      message: "Las unidades deben ser un numero",
    })
    .int({
      message: "Las unidades deben ser un numero entero",
    })
    .positive({
      message: "Las unidades deben ser un numero positivo",
    }),
  afiliateNumber: z.coerce
    .number({
      message: "El numero de afiliado debe ser un numero",
    })
    .int({
      message: "El numero de afiliado debe ser un numero entero",
    })
    .positive({
      message: "El numero de afiliado debe ser un numero positivo",
    }),
  insurance: z.nativeEnum(Insurance, {
    message: "La obra social es requerida",
  }),
  sex: z.nativeEnum(Sex, {
    message: "El sexo es requerido",
  }),
  presentation: z.string({
    message: "La presentacion es requerida",
  }),
  diagnosis: z.string({
    message: "El diagnostico es requerido",
  }),
  medication: z.string({
    message: "El medicamento es requerido",
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
          onSubmitValid={(data) => {
            console.log(data);
          }}
          className="w-full grid grid-cols-3 gap-4"
        >
          {({ control }) => (
            <>
              <FormInput
                type="text"
                label="Nombre"
                control={control}
                name={"firstName"}
              />
              <FormInput
                type="text"
                label="Apellido/s"
                control={control}
                name={"lastName"}
              />
              <FormInput
                type="email"
                label="Correo electronico"
                control={control}
                name={"email"}
                autoComplete="email"
              />
              <FormInput
                type="number"
                label="DNI"
                control={control}
                name={"dni"}
                hideArrows
              />
              <FormInput
                type="number"
                label="Unidades"
                control={control}
                name={"units"}
                hideArrows
              />
              <FormInput
                type="number"
                label="Numero de afiliado"
                control={control}
                name={"afiliateNumber"}
                hideArrows
              />
              <FormSelect
                control={control}
                name="insurance"
                label="Obra social"
                items={[
                  { value: Insurance.SwissMedical, label: "Swiss Medical" },
                  { value: Insurance.OSDE, label: "OSDE" },
                  { value: Insurance.Galeno, label: "Galeno" },
                  { value: Insurance.Medicus, label: "Medicus" },
                ]}
                placeholder={"Selecciona una obra social"}
              />
              <FormSelect
                control={control}
                name="sex"
                label="Sexo"
                items={[
                  { value: Sex.MALE, label: "Masculino" },
                  { value: Sex.FEMALE, label: "Femenino" },
                  { value: Sex.OTHER, label: "Otro" },
                ]}
                placeholder={"Selecciona el sexo del paciente"}
              />
              <FormSelect
                control={control}
                name="presentation"
                label="Presentacion"
                items={[
                  { value: "20 comprimidos", label: "20 Comprimidos" },
                  { value: "30 comprimidos", label: "30 Comprimidos" },
                  { value: "40 comprimidos", label: "40 Comprimidos" },
                ]}
                placeholder={"Selecciona la presentacion del medicamento"}
              />
              <FormTextarea
                control={control}
                name="diagnosis"
                label="Diagnostico"
                disableResize
              />
              <FormCombobox
                control={control}
                name="medication"
                label="Medicamento"
                items={[
                  { value: "ibuprofeno", label: "Ibuprofeno" },
                  { value: "paracetamol", label: "Paracetamol" },
                  { value: "amoxicilina", label: "Amoxicilina" },
                ]}
                placeholder={"Selecciona un medicamento"}
                emptyMessage={"No se encontraron medicamentos"}
              />
              <FormDateInput
                name={"dateOfBirth"}
                control={control}
                label="Fecha de nacimiento"
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
