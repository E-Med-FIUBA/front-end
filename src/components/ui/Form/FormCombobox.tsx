import { FieldWrapper, FieldWrapperPassThroughProps } from "./FormFieldWrapper";
import { FieldPath, FieldValues } from "react-hook-form";
import { Combobox, ComboboxProps } from "../combobox";

interface FormComboboxProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends FieldWrapperPassThroughProps<TFieldValues, TName>,
    Omit<ComboboxProps, "value" | "onChange"> {}

export const FormCombobox = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
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
