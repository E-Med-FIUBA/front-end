import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { userDataMock } from "@/testing/mocks/userData";
import { Form } from "@/components/ui/Form";

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
    <Form
      className="grid gap-2 w-full max-w-80"
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
  );
}
