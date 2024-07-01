import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { userDataMock } from "@/testing/mocks/userData";
import { Form } from "@/components/ui/Form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onValid: SubmitHandler<LoginFormInputs> = (data) => {
    login(userDataMock);
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
              <Button type="button" variant="outline" asChild>
                <Link to="/register">Crear cuenta nueva</Link>
              </Button>
            </>
          )}
        </Form>
      </CardContent>
    </Card>
  );
}
