import { format, isValid, parse } from 'date-fns';
import React from 'react';

import useCheckMobileScreen from '@/hooks/use-check-mobile-screen';

import { Input } from './input';

export interface DateInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  min?: string;
  max?: string;
}

export const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  (
    { onChange: onChangeWrapper, onBlur: onBlurWrapper, min, max, ...props },
    ref,
  ) => {
    const isMobile = useCheckMobileScreen();
    const currentDate = new Date();
    const minDate = parse(min || '', 'dd/MM/yyyy', currentDate);
    const maxDate = parse(max || '', 'dd/MM/yyyy', currentDate);

    const formatDate = (value: string) => {
      const cleaned = value.replace(/\D+/g, '');
      const match = cleaned.match(/^(\d{0,2})(\d{0,2})(\d{0,4})$/);

      if (match) {
        const part1 = match[1];
        const part2 = match[2] ? '/' + match[2] : '';
        const part3 = match[3] ? '/' + match[3] : '';
        return part1 + part2 + part3;
      }
      return value;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const caret = e.target.selectionStart;
      const value = e.target.value;
      const formattedDate = formatDate(value);
      if (formattedDate.length < value.length) {
        window.requestAnimationFrame(() => {
          e.target.selectionStart = caret;
          e.target.selectionEnd = caret;
        });
      }
      e.target.value = formattedDate;
      onChangeWrapper &&
        onChangeWrapper(e as React.ChangeEvent<HTMLInputElement>);
    };

    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const date = parse(value, 'dd/MM/yyyy', currentDate);
      if (isValid(date)) {
        if (minDate && date < minDate) {
          e.target.value = format(minDate, 'dd/MM/yyyy');
        } else if (maxDate && date > maxDate) {
          e.target.value = format(maxDate, 'dd/MM/yyyy');
        } else {
          e.target.value = format(date, 'dd/MM/yyyy');
        }
      } else {
        e.target.value = '';
      }
      onBlurWrapper && onBlurWrapper(e);
    };

    if (isMobile) {
      return (
        <Input type="date" onChange={onChangeWrapper} {...props} ref={ref} />
      );
    } else {
      return (
        <Input
          type="text"
          placeholder="DD/MM/YYYY"
          maxLength={10}
          {...props}
          onChange={handleChange}
          onBlur={handleOnBlur}
          ref={ref}
        />
      );
    }
  },
);

DateInput.displayName = 'DateInput';
