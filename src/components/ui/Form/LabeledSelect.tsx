import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface LabeledSelectProps {
  label: string;
  id: string;
  containerClassName?: string;
  items: string[];
}

function LabeledSelect({
  label,
  containerClassName,
  id,
  items,
}: LabeledSelectProps) {
  return (
    <div className={containerClassName}>
      <Label htmlFor={id}>{label}</Label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecciona una obra social" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export { LabeledSelect };
