import { LoginForm } from "@/features/auth/components/LoginForm";

export function LoginRoute() {
  return (
    <div className="container lg:max-w-5xl h-svh flex justify-around items-center">
      <div className="hidden lg:block w-1/4">
        <img src="/vite.svg" alt="Doctor" className="w-full" />
      </div>
      <LoginForm />
    </div>
  );
}
