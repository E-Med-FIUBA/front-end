import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";

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
import { UserData } from "@/lib/auth";
import { ApiClient } from "@/lib/api-client";

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onValid: SubmitHandler<LoginFormInputs> = async (data) => {
    const res = await ApiClient.post<UserData>("/auth/login", data); // TODO: Handle errors
    login(res);
    navigate("/dashboard");
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Inicio de Sesión</CardTitle>
        <CardDescription>
          Ingresa tus datos para iniciar sesion en tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form
          className="grid gap-4 w-full"
          onSubmit={onValid}
          schema={loginSchema}
        >
          {({ register }) => (
            <>
              <Input
                type="text"
                placeholder="Correo electronico"
                {...register("email")}
              />
              <Input
                type="password"
                placeholder="Contraseña"
                {...register("password")}
              />
              <Button type="submit">Iniciar sesion</Button>
            </>
          )}
        </Form>
        <AuthFormFooter
          to="/register"
          text="No tienes una cuenta?"
          linkText="Registrate aqui"
        />
      </CardContent>
    </Card>
  );
}
