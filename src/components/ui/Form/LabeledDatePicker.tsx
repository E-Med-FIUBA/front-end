import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";

export interface LabeledDatePickerProps {
  label: string;
  containerClassName?: string;
}

function LabeledDatePicker({
  label,
  containerClassName,
}: LabeledDatePickerProps) {
  return (
    <div className={containerClassName}>
      <Label>{label}</Label>
      <DatePicker />
    </div>
  );
}

export { LabeledDatePicker };
