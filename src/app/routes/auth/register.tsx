import { RegisterForm } from '@/features/auth/components/register-form';

export function RegisterRoute() {
  return (
    <div className="container flex h-svh items-center justify-around lg:max-w-5xl">
      <RegisterForm />
    </div>
  );
}
