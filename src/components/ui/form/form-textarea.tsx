import { FieldPath, FieldValues } from 'react-hook-form';

import { Textarea, TextareaProps } from '../textarea';

import {
  FieldWrapper,
  FieldWrapperPassThroughProps,
} from './form-field-wrapper';

interface FormTextareaProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends FieldWrapperPassThroughProps<TFieldValues, TName>,
    TextareaProps {
  name: TName;
  containerClassName?: string;
}

export const FormTextarea = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  control,
  name,
  description,
  containerClassName,
  ...props
}: FormTextareaProps<TFieldValues, TName>) => {
  return (
    <FieldWrapper
      control={control}
      name={name}
      label={label}
      description={description}
      className={containerClassName}
    >
      {(field) => <Textarea {...props} {...field} />}
    </FieldWrapper>
  );
};
