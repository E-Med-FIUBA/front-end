import * as React from 'react';

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';

export type DisplayInputProps = {
  label?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export const DisplayInput = ({
  children,
  label,
  description,
  className,
}: DisplayInputProps) => {
  return (
    <FormItem className={className}>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>{children}</FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
};
