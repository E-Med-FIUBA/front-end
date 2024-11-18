import { useState, useEffect } from 'react';
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
import { GradientShadow } from '@/components/ui/gradient-shadow';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/use-auth';
import { ApiClient, ApiError } from '@/lib/api-client';
import { UserData } from '@/lib/auth';

import { AuthFormFooter } from './auth-form-footer';
import KeyManager, { IncompatibleKeyError, InvalidFormatError } from '@/lib/signature/key_management';
import { Label } from '@/components/ui/label';

const baseSchema = z.object({
  email: z.string().email({ message: "Correo electronico invalido" }),
  password: z.string().min(6, { message: "Contraseña debe tener al menos 6 caracteres" }),
});

const privateKeySchema = baseSchema.extend({
  privateKey: z.instanceof(FileList).refine((files) => files.length > 0 && files[0].size > 0, {
    message: "Clave privada es requerida",
  }),
});

type LoginFormInputs = z.infer<typeof privateKeySchema>;

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginSchema, setLoginSchema] = useState(baseSchema);

  useEffect(() => {
    const checkKey = async () => {
      const hasKey = await KeyManager.hasKey();
      if (!hasKey) {
        setLoginSchema(privateKeySchema);
      }
    };

    checkKey();
  }, []);

  const onValid: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsLoading(true);
    try {
      const res = await ApiClient.post<UserData>('/auth/login/doctor', { email: data.email, password: data.password });

      const privateKey = await data.privateKey?.[0]?.text();
      await login({ ...res, privateKey });
      navigate('/patients');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      if (error instanceof ApiError) {
        toast.error('Credenciales invalidas');
      } else if (error instanceof IncompatibleKeyError || error instanceof InvalidFormatError) {
        toast.error(error.message);
        setLoginSchema(privateKeySchema);
      } else {
        toast.error(
          'El sistema se encuentra temporalmente fuera de servicio, aguarde unos minutos e intente nuevamente',
        );
      }
    }
  };

  const onError = (errors: any) => {
    console.error('Schema validation errors:', errors);
    toast.error('Por favor, corrige los errores en el formulario.');
  };

  return (
    <GradientShadow
      colors={['#009994', '#4c64ab', '#009994']}
      className="w-full max-w-sm"
    >
      <Card>
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
            onSubmitInvalid={onError}
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
                {loginSchema === privateKeySchema && (
                  <>
                    <Label>Clave privada</Label>
                    <Input
                      type="file"
                      placeholder="Clave privada"
                      {...register('privateKey')}
                    ></Input>
                  </>
                )}
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
    </GradientShadow>
  );
}
