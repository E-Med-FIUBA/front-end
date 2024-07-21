import * as React from "react";
import {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./Form";

// type FieldWrapperProps<TFormValues extends FieldValues> = {
//   children: (field: ControllerRenderProps<FieldValues, string>) => React.ReactNode;
//   control: Control<TFormValues, any>;
//   name: TFormValues;
//   label?: string;
//   description?: string;
// };

type FieldWrapperProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  description?: string;
  children: (
    field: ControllerRenderProps<TFieldValues, TName>
  ) => React.ReactNode;
  className?: string;
};

export type FieldWrapperPassThroughProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<FieldWrapperProps<TFieldValues, TName>, "className" | "children">;

export const FieldWrapper = <TFormValues extends FieldValues>({
  control,
  name,
  children,
  label,
  description,
  className,
}: FieldWrapperProps<TFormValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>{children(field)}</FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
