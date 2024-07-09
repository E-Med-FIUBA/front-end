import { InputProps } from "@/components/ui/input";
import { FieldWrapper, FieldWrapperPassThroughProps } from "./FormFieldWrapper";
import { FieldPath, FieldValues } from "react-hook-form";
import { DateInput } from "../DateInput";

interface FormDateInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends FieldWrapperPassThroughProps<TFieldValues, TName>,
    InputProps {
  name: TName;
}

export const FormDateInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  control,
  name,
  description,
  ...props
}: FormDateInputProps<TFieldValues, TName>) => {
  return (
    <FieldWrapper
      control={control}
      name={name}
      label={label}
      description={description}
    >
      {(field) => <DateInput {...props} {...field} />}
    </FieldWrapper>
  );
};
