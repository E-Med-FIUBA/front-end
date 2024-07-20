import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Form } from "@/components/ui/Form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthFormFooter } from "./AuthFormFooter";
import { FormInput } from "@/components/ui/Form/FormInput";
import { FormSelect } from "@/components/ui/Form/FormSelect";
import { ApiClient, ApiError } from "@/lib/api-client";
import { UserData } from "@/lib/auth";
import { toast } from "react-toastify";

const registerSchema = z.object({
  firstName: z
    .string({
      message: "El nombre es obligatorio",
    })
    .min(1, "El nombre es obligatorio"),
  lastName: z
    .string({
      message: "El apellido es obligatorio",
    })
    .min(1, "El apellido es obligatorio"),
  email: z
    .string({
      message: "El correo electronico es obligatorio",
    })
    .email({ message: "Correo electronico invalido" }),
  password: z
    .string({
      message: "La contraseña es obligatoria",
    })
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  license: z
    .string({
      message: "La matricula es obligatoria",
    })
    .min(1, "La matricula es obligatoria"),
  dni: z.coerce
    .number({
      message: "El DNI debe ser un numero",
    })
    .int()
    .min(1000000, "El DNI debe tener al menos 7 digitos")
    .max(99999999, "El DNI debe tener como maximo 8 digitos"),
  specialty: z
    .string({
      message: "La especialidad es obligatoria",
    })
    .min(1, "La especialidad es obligatoria"),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onValid: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      const res = await ApiClient.post<UserData>("/auth/register/doctor", {
        ...data,
        name: data.firstName,
      });
      login(res);
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error(
          "El sistema se encuentra temporalmente fuera de servicio, aguarde unos minutos e intente nuevamente"
        );
      }
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Registro</CardTitle>
        <CardDescription>
          Ingresa tus datos para crear una cuenta nueva
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form
          onSubmitValid={onValid}
          schema={registerSchema}
          className="grid gap-4"
        >
          {({ control }) => (
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
                name="specialty"
                items={[
                  { value: "cardiologo", label: "Cardiologo" },
                  { value: "neurologo", label: "Neurologo" },
                  { value: "pediatra", label: "Pediatra" },
                  { value: "otorrino", label: "Otorrino" },
                ]}
              />
              <Button type="submit" className="w-full">
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
  );
}
