import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { userDataMock } from "@/testing/mocks/userData";

const schema = z.object({
  email: z.string().email({
    message: "Correo electronico invalido",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
});

type LoginFormInputs = z.infer<typeof schema>;

export function LoginForm() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(schema),
  });

  const onValid: SubmitHandler<LoginFormInputs> = (data) => {
    login(userDataMock);
  };

  return (
    <form
      className="grid gap-2 w-full max-w-80"
      onSubmit={handleSubmit(onValid)}
    >
      <Input
        type="text"
        placeholder="Correo electronico"
        error={errors.email}
        {...register("email")}
      />
      <Input
        type="password"
        placeholder="Contraseña"
        error={errors.password}
        {...register("password")}
      />
      <Button type="submit">Iniciar sesion</Button>
      <Button type="button" variant="outline" asChild>
        <Link to="/register">Crear cuenta nueva</Link>
      </Button>
    </form>
  );
}
