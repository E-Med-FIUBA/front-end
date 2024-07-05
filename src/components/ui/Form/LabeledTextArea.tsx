import { Label } from "@/components/ui/label";
import { Textarea, TextareaProps } from "@/components/ui/textarea";

export interface LabeledTextAreaProps extends TextareaProps {
  label: string;
  containerClassName?: string;
}

function LabeledTextarea({
  label,
  containerClassName,
  id,
  ...props
}: LabeledTextAreaProps) {
  return (
    <div className={containerClassName}>
      <Label htmlFor={id}>{label}</Label>
      <Textarea id={id} {...props} />
    </div>
  );
}

export { LabeledTextarea };
