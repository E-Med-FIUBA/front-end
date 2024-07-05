import { Combobox, ComboboxItem } from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";

export interface LabeledComboboxProps {
  label: string;
  containerClassName?: string;
  items: ComboboxItem[];
}

function LabeledCombobox({
  label,
  containerClassName,
  items,
}: LabeledComboboxProps) {
  return (
    <div className={containerClassName}>
      <Label>{label}</Label>
      <Combobox
        items={items}
        placeholder="Seleccione un medicamento"
        emptyMessage="No se encontraron medicamentos"
        className="flex w-full"
      />
    </div>
  );
}

export { LabeledCombobox };
