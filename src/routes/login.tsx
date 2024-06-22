import { Button, LabeledInput } from "@/components";

export default function Login() {
  return (
    <div
      id="login"
      className="w-svw h-svh flex flex-col justify-center items-center"
    >
      <h1>E-Med</h1>
      <form>
        <LabeledInput label="Username:" />
        <br />
        <LabeledInput label="Password:" />
        <br />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
