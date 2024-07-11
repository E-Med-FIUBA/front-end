import { Input, InputProps } from "@/components/ui/input";
import { FieldWrapper, FieldWrapperPassThroughProps } from "./FormFieldWrapper";
import { FieldPath, FieldValues } from "react-hook-form";

interface FormInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends FieldWrapperPassThroughProps<TFieldValues, TName>,
    InputProps {
  name: TName;
}

export const FormInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  type,
  label,
  control,
  name,
  description,
  ...props
}: FormInputProps<TFieldValues, TName>) => {
  return (
    <FieldWrapper
      control={control}
      name={name}
      label={label}
      description={description}
    >
      {(field) => <Input type={type} {...props} {...field} />}
    </FieldWrapper>
  );
};
