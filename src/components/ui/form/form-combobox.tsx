import { ChevronsUpDown, Check } from 'lucide-react';
import { useState } from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';

import { cn } from '@/utils/cn';

import { Button } from '../button';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '../command';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';

import { FieldWrapperPassThroughProps } from './form-field-wrapper';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '.';

export type ComboboxItem = {
  label: string;
  value: string;
};

export type ComboboxProps = {
  items: ComboboxItem[];
  placeholder: string;
  emptyMessage: string;
  className?: string;
  value: string;
  onChange: (value: string) => void;
};

interface FormComboboxProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends FieldWrapperPassThroughProps<TFieldValues, TName>,
    Omit<ComboboxProps, 'value' | 'onChange'> {}

export const FormCombobox = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  control,
  name,
  description,
  items,
  placeholder,
  emptyMessage,
  className,
}: FormComboboxProps<TFieldValues, TName>) => {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl className="w-full">
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn('justify-between ', className)}
                >
                  <span className="flex-1 overflow-hidden text-ellipsis text-start">
                    {field.value
                      ? items.find((item) => item.value === field.value)?.label
                      : placeholder}
                  </span>
                  <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
              <Command>
                <CommandInput placeholder={placeholder} />
                <CommandList>
                  <CommandEmpty>{emptyMessage}</CommandEmpty>
                  <CommandGroup>
                    {items.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onSelect={(currentValue) => {
                          field.onChange(currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            field.value === item.value
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                        {item.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
