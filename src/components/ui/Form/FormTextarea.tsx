import { FieldWrapper, FieldWrapperPassThroughProps } from "./FormFieldWrapper";
import { FieldPath, FieldValues } from "react-hook-form";
import { Textarea, TextareaProps } from "../textarea";

interface FormTextareaProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends FieldWrapperPassThroughProps<TFieldValues, TName>,
    TextareaProps {
  name: TName;
}

export const FormTextarea = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  control,
  name,
  description,
  ...props
}: FormTextareaProps<TFieldValues, TName>) => {
  return (
    <FieldWrapper
      control={control}
      name={name}
      label={label}
      description={description}
    >
      {(field) => <Textarea {...props} {...field} />}
    </FieldWrapper>
  );
};
