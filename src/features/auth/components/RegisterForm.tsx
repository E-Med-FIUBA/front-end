import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import SignatureCanvas from "react-signature-canvas";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { userDataMock } from "@/testing/mocks/userData";
import { Form } from "@/components/ui/Form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthFormFooter } from "./AuthFormFooter";
import { Trash } from "lucide-react";

const SignatureInput = () => {
  const signatureRef = useRef<SignatureCanvas>(null);

  const clearSignature = (e: React.MouseEvent) => {
    e.preventDefault();
    signatureRef.current?.clear();
  };

  return (
    <div className="flex flex-col gap-4 relative border p-1 rounded-md">
      <SignatureCanvas
        penColor="black"
        canvasProps={{
          height: 300,
          className: "sigCanvas w-full border bg-muted rounded-md",
        }}
        ref={signatureRef}
      />
      <Button
        onClick={clearSignature}
        className="absolute top-0 right-0 m-2 z-50 bg-transparent border border-background hover:bg-background hover:text-foreground"
        size="icon"
      >
        <Trash />
      </Button>
    </div>
  );
};

const registerSchema = z.object({
  firstName: z.string().min(1, "El nombre es obligatorio"),
  lastName: z.string().min(1, "El apellido es obligatorio"),
  email: z.string().email({ message: "Correo electronico invalido" }),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  registration: z.string().min(1, "La matricula es obligatoria"),
  dni: z.coerce
    .number({
      message: "El DNI debe ser un numero",
    })
    .int()
    .min(1000000, "El DNI debe tener al menos 7 digitos")
    .max(99999999, "El DNI debe tener como maximo 8 digitos"),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onValid: SubmitHandler<RegisterFormInputs> = (data) => {
    login(userDataMock);
    navigate("/dashboard");
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
        <Form onSubmit={onValid} schema={registerSchema} className="grid gap-4">
          {({ register, formState }) => (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="Nombre"
                  {...register("firstName")}
                  error={formState.errors.firstName}
                />
                <Input
                  type="text"
                  placeholder="Apellido/s"
                  {...register("lastName")}
                  error={formState.errors.lastName}
                />
              </div>
              <Input
                type="text"
                placeholder="Correo electronico"
                {...register("email")}
                error={formState.errors.email}
              />
              <Input
                type="password"
                placeholder="Contraseña"
                {...register("password")}
                error={formState.errors.email}
              />
              <Input
                type="text"
                placeholder="Matricula"
                {...register("registration")}
                error={formState.errors.registration}
              />
              <Input
                type="number"
                placeholder="DNI"
                {...register("dni")}
                error={formState.errors.dni}
                hideArrows
              />
              <SignatureInput />
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
