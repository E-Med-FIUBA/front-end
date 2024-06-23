import { Button, Input } from "@/components";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="container lg:max-w-5xl h-svh flex justify-around items-center">
      <div className="hidden lg:block w-1/4">
        <img src="/vite.svg" alt="Doctor" className="w-full" />
      </div>
      <form className="grid gap-2 w-full max-w-80">
        <Input type="text" placeholder="Correo electronico" />
        <Input type="text" placeholder="Correo electronico" />
        <Button type="submit">Login</Button>
        <Button type="button" asChild>
          <Link to="/register">Register</Link>
        </Button>
      </form>
    </div>
  );
}
