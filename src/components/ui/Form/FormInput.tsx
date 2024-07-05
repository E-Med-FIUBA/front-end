import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Input, InputProps } from "@/components/ui/input";
import { FieldWrapper } from "./FormFieldWrapper";

interface FormInputProps extends InputProps {
  error?: FieldError;
  containerClassName?: string;
  id: string;
  label?: string;
  registration: Partial<UseFormRegisterReturn>;
}

export const FormInput = ({
  className,
  type,
  error,
  containerClassName,
  id,
  label,
  registration,
  ...props
}: FormInputProps) => {
  return (
    <FieldWrapper
      error={error}
      id={id}
      className={containerClassName}
      label={label}
    >
      <Input
        id={id}
        type={type}
        error={error}
        {...registration}
        {...props}
      />
    </FieldWrapper>
  );
};
