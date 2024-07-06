import { FieldWrapper, FieldWrapperPassThroughProps } from "./FormFieldWrapper";
import { FieldPath, FieldValues } from "react-hook-form";
import { Combobox, ComboboxProps } from "../combobox";
import { cn } from "@/utils/cn";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { Button } from "../button";

interface FormComboboxProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends FieldWrapperPassThroughProps<TFieldValues, TName>,
    Omit<ComboboxProps, "value" | "onChange"> {}

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
];

export const FormCombobox = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  className,
  label,
  control,
  name,
  description,
  ...props
}: FormComboboxProps<TFieldValues, TName>) => {
  return (
    <FieldWrapper
      control={control}
      name={name}
      label={label}
      description={description}
    >
      {({ onChange, value }) => (
        <Combobox
          {...props}
          value={value}
          onChange={onChange}
          className="flex w-full"
        />
      )}
    </FieldWrapper>
  );
};
