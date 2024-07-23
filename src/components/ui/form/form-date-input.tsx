import { FieldPath, FieldValues } from 'react-hook-form';

import { DateInput, DateInputProps } from '../date-input';

import {
  FieldWrapper,
  FieldWrapperPassThroughProps,
} from './form-field-wrapper';

interface FormDateInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends FieldWrapperPassThroughProps<TFieldValues, TName>,
    DateInputProps {
  name: TName;
  containerClassName?: string;
}

export const FormDateInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  control,
  name,
  description,
  containerClassName,
  ...props
}: FormDateInputProps<TFieldValues, TName>) => {
  return (
    <FieldWrapper
      control={control}
      name={name}
      label={label}
      description={description}
      className={containerClassName}
    >
      {(field) => (
        <DateInput
          {...props}
          {...field}
          onBlur={(e) => {
            field.onBlur();
            field.onChange(e);
          }}
        />
      )}
    </FieldWrapper>
  );
};
