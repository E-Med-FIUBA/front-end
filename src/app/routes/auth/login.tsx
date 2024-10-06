import { Logo } from '@/components/ui/logo';
import { LoginForm } from '@/features/auth/components/login-form';

export function LoginRoute() {
  return (
    <div className="container flex h-svh items-center justify-around lg:max-w-5xl">
      <div className="hidden w-1/4 lg:block">
        <Logo className="w-full" />
      </div>
      <LoginForm />
    </div>
  );
}
