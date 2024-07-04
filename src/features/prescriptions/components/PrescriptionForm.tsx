import { Form } from "@/components/ui/Form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-xl">Crear prescripcion</CardTitle>
        <CardDescription>
          Ingresa los datos del paciente para crear una prescripcion y enviarla
          por correo electronico
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <Form
          schema={prescriptionSchema}
          onSubmit={() => {
            console.log("hola");
          }}
          className="w-full grid grid-cols-2 gap-2"
        >
          {({ register, formState }) => (
            <>
              <Input
                type="text"
                placeholder="Nombre"
                {...register("firstName")}
                error={formState.errors.firstName}
              />
              <Input
                type="text"
                placeholder="Apellido"
                {...register("lastName")}
                error={formState.errors.lastName}
              />
              <Input
                type="text"
                placeholder="Correo electronico"
                {...register("email")}
                error={formState.errors.email}
                containerClassName="col-span-2"
              />
              <Input
                type="text"
                placeholder="DNI"
                {...register("dni")}
                error={formState.errors.dni}
                containerClassName="col-span-2"
              />
              <DatePicker />

              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona el sexo del paciente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sexo del paciente</SelectLabel>
                    <SelectItem value="osde">Masculino</SelectItem>
                    <SelectItem value="sm">Femenino</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona una obra social" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Obras Sociales</SelectLabel>
                    <SelectItem value="osde">OSDE</SelectItem>
                    <SelectItem value="sm">Swiss Medical</SelectItem>
                    <SelectItem value="galeno">Galeno</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Combobox
                values={[
                  { label: "Ibuprofeno", value: "ibuprofeno" },
                  { label: "Paracetamol", value: "paracetamol" },
                ]}
                placeholder="Seleccione un medicamento"
                emptyMessage="No se encontraron medicamentos"
              />
              <Combobox
                values={[
                  {
                    label: "Caja de 20 comprimidos",
                    value: "caja de 20 comprimidos",
                  },
                  {
                    label: "Caja de 10 comprimidos",
                    value: "caja de 10 comprimidos",
                  },
                ]}
                placeholder="Seleccione una presentacion"
                emptyMessage="No se encontraron presentaciones para el medicamento seleccionado"
              />
              <Input
                type="number"
                placeholder="Unidades"
                {...register("units")}
                error={formState.errors.units}
                hideArrows
              />
              <Textarea placeholder="Escriba su diagnostico aqui" className="col-span-2" />
              <Button type="submit" className="col-span-2">
                Enviar
              </Button>
            </>
          )}
        </Form>
      </CardContent>
    </Card>
  );
}
