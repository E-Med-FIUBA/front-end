import { Input, InputProps } from "./input";

export interface LabeledInputProps extends InputProps {
  label: string;
}

function LabeledInput({ label, ...props }: LabeledInputProps) {
  return (
    <label>
      {label}
      <Input {...props} />
    </label>
  );
}

export { LabeledInput };
