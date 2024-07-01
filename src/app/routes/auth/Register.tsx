import { RegisterForm } from "@/features/auth/components/RegisterForm";

export function RegisterRoute() {
  return (
    <div className="container lg:max-w-5xl h-svh flex justify-around items-center">
      <RegisterForm />
    </div>
  );
}
