import { format, isValid, parse } from "date-fns";
import { Input } from "./input";

interface DateInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "onBlur"
  > {}

export function DateInput({
  onChange: onChangeWrapper,
  ...props
}: DateInputProps) {
  const currentDate = new Date();

  const formatDate = (value: string) => {
    const cleaned = value.replace(/\D+/g, "");
    const match = cleaned.match(/^(\d{0,2})(\d{0,2})(\d{0,4})$/);

    if (match) {
      const part1 = match[1];
      const part2 = match[2] ? "/" + match[2] : "";
      const part3 = match[3] ? "/" + match[3] : "";
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
    const date = parse(value, "dd/MM/yyyy", currentDate);
    if (isValid(date)) {
      e.target.value = format(date, "dd/MM/yyyy");
    } else {
      e.target.value = "";
    }
  };

  return (
    <>
      <Input
        type="text"
        placeholder="DD/MM/YYYY"
        maxLength={10}
        {...props}
        onChange={handleChange}
        onBlur={handleOnBlur}
        className="hidden md:block"
      />
      <Input
        type="date"
        className="md:hidden"
        onChange={onChangeWrapper}
        {...props}
      />
    </>
  );
}
