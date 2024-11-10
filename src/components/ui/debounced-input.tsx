import { InputHTMLAttributes, useState, useEffect } from 'react';

import { Input } from './input';

export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  onlyNumbers,
  ...props
}: {
  value: string;
  onChange: (value: string) => void;
  onlyNumbers?: boolean;
  debounce?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => {
        const newValue = e.target.value;
        if (onlyNumbers && isNaN(Number(newValue))) return;
        setValue(newValue);
      }}
    />
  );
}
