import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface LabeledInputProps extends InputProps {
  label: string;
}

function LabeledInput({
  label,
  containerClassName,
  id,
  ...props
}: LabeledInputProps) {
  return (
    <div className={containerClassName}>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...props} />
    </div>
  );
}

export { LabeledInput };
