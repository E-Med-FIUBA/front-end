import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/use-auth';
import { ApiClient, ApiError } from '@/lib/api-client';
import { UserData } from '@/lib/auth';

import { AuthFormFooter } from './auth-form-footer';
import { KeyStore } from '@/lib/key/key';

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const keyStore = new KeyStore();

  const onValid: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsLoading(true);
    try {
      const res = await ApiClient.post<UserData>('/auth/login', data);
      login(res);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      if (error instanceof ApiError) {
        toast.error('Credenciales invalidas');
      } else {
        toast.error(
          'El sistema se encuentra temporalmente fuera de servicio, aguarde unos minutos e intente nuevamente',
        );
      }
    }
  };

  const onClick = () => {
    console.log(keyStore.generateCredentials({
      name: 'Ian',
      lastName: 'Shih',
      countryName: 'AR',
      province: 'CABA',
      localityName: 'CABA',
      password: 'xdxd'
    }));
  }

  const onClick2 = () => {
    console.log(keyStore.getPrivateKey('xdxd'))
  }

  return (
    <Card className="w-full max-w-sm">
      <Button onClick={onClick}>GENERAR CREDENCIALES</Button>
      <Button onClick={onClick2}>IMPRIMIR CREDENCIALES</Button>
      <CardHeader>
        <CardTitle className="text-xl">Inicio de Sesión</CardTitle>
        <CardDescription>
          Ingresa tus datos para iniciar sesion en tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form
          className="grid w-full gap-4"
          onSubmitValid={onValid}
          schema={loginSchema}
        >
          {({ register }) => (
            <>
              <Input
                type="text"
                placeholder="Correo electronico"
                {...register('email')}
              />
              <Input
                type="password"
                placeholder="Contraseña"
                {...register('password')}
              />
              <Button type="submit" loading={isLoading}>
                Iniciar sesion
              </Button>
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
