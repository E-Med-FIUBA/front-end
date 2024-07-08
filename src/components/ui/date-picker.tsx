import { useEffect, useRef, useState } from "react";
import { format, set, isValid, parse } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./input";
import { el, es, hi } from "date-fns/locale";

const LOWER_YEAR_LIMIT = 1900;

enum DatePart {
  Day = "day",
  Month = "month",
  Year = "year",
}

const partFromCursor = (cursorPosition: number): DatePart => {
  if (cursorPosition <= 2) return DatePart.Day;
  if (cursorPosition <= 5) return DatePart.Month;
  return DatePart.Year;
};

const selectionFromPart = (part: DatePart): [number, number] => {
  switch (part) {
    case DatePart.Day:
      return [0, 2];
    case DatePart.Month:
      return [3, 5];
    case DatePart.Year:
      return [6, 10];
  }
};

const isValidDate = (
  day: number | null,
  month: number | null,
  year: number | null
): boolean => {
  day = day || 1;
  month = month || 1;
  year = year || 1;
  const parsedDate = parse(`${day}/${month}/${year}`, "P", new Date(), {
    locale: es,
  });
  return isValid(parsedDate);
};

const formatDate = (
  day: DatePickerPartData,
  month: DatePickerPartData,
  year: DatePickerPartData
): string => {
  const formattedDay = day.value.length > 0 ? day.value.padStart(2, "0") : "DD";
  const formattedMonth =
    month.value.length > 0 ? month.value.padStart(2, "0") : "MM";
  const formattedYear =
    year.value.length > 0 ? year.value.padStart(4, "0") : "YYYY";
  return `${formattedDay}/${formattedMonth}/${formattedYear}`;
};

type DatePickerPartData = {
  value: string;
  shouldReplace: boolean;
};

export function DatePicker() {
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState<DatePickerPartData>({
    value: "",
    shouldReplace: false,
  });
  const [month, setMonth] = useState<DatePickerPartData>({
    value: "",
    shouldReplace: false,
  });
  const [year, setYear] = useState<DatePickerPartData>({
    value: "",
    shouldReplace: false,
  });
  const [selectedPart, setSelectedPart] = useState<DatePart>(DatePart.Day);
  const inputRef = useRef<HTMLInputElement>(null);

  const date =
    year.value && month.value && day.value
      ? new Date(
          parseInt(year.value) || 0,
          (parseInt(month.value) || 1) - 1,
          parseInt(day.value) || 0
        )
      : new Date();
  const currentDate = new Date();

  const highlightPart = (part: DatePart) => {
    const input = inputRef.current;
    if (!input) return;

    let [start, end] = selectionFromPart(part);
    setSelectedPart(part);
    input.setSelectionRange(start, end);
  };

  const resetPart = (part: DatePart) => {
    switch (part) {
      case DatePart.Day:
        setDay({
          value: "",
          shouldReplace: false,
        });
        break;
      case DatePart.Month:
        setMonth({
          value: "",
          shouldReplace: false,
        });
        break;
      case DatePart.Year:
        setYear({
          value: "",
          shouldReplace: false,
        });
        break;
    }
  };

  const updateDay = (value: string) => {
    const newDay = day.value.substring(day.value.length - 1) + value;
    const newDayNumber = parseInt(newDay);
    if (isNaN(newDayNumber)) return;

    if (newDayNumber > 31 || day.shouldReplace) {
      setDay({
        value: value,
        shouldReplace: false,
      });
      return;
    }

    setDay({
      value: newDay,
      shouldReplace: false,
    });

    if (newDay.length >= 2) {
      highlightPart(DatePart.Month);
    }
  };

  const updateMonth = (value: string) => {
    const newMonth = month.value.substring(month.value.length - 1) + value;
    const newMonthNumber = parseInt(newMonth);
    if (isNaN(newMonthNumber)) return;

    if (newMonthNumber > 12 || month.shouldReplace) {
      setMonth({
        value: value,
        shouldReplace: false,
      });
      return;
    }

    setMonth({
      value: newMonth,
      shouldReplace: false,
    });

    if (newMonth.length >= 2) {
      highlightPart(DatePart.Year);
    }
  };

  const updateYear = (value: string) => {
    const newYear = year.value.substring(year.value.length - 3) + value;
    const newYearNumber = parseInt(newYear);
    if (isNaN(newYearNumber)) return;

    if (year.shouldReplace) {
      setYear({
        value: value,
        shouldReplace: false,
      });
      return;
    }

    if (newYearNumber > currentDate.getFullYear()) {
      setYear({
        value: currentDate.getFullYear().toString(),
        shouldReplace: true,
      });
      return;
    }

    setYear({
      value: newYear,
      shouldReplace: false,
    });
  };

  const handleInput = (value: string) => {
    if (selectedPart !== DatePart.Day) {
      setDay((prevDay) => ({
        ...prevDay,
        shouldReplace: true,
      }));
    }
    if (selectedPart !== DatePart.Month) {
      setMonth((prevMonth) => ({
        ...prevMonth,
        shouldReplace: true,
      }));
    }
    if (selectedPart !== DatePart.Year) {
      setYear((prevYear) => ({
        ...prevYear,
        shouldReplace: true,
      }));
    }
    if (isNaN(parseInt(value))) return;
    if (selectedPart === DatePart.Day) updateDay(value);
    if (selectedPart === DatePart.Month) updateMonth(value);
    if (selectedPart === DatePart.Year) updateYear(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const parts = [DatePart.Day, DatePart.Month, DatePart.Year];
      const currentIndex = parts.indexOf(selectedPart);
      const newIndex =
        e.key === "ArrowLeft"
          ? (currentIndex + parts.length - 1) % parts.length
          : (currentIndex + 1) % parts.length;
      highlightPart(parts[newIndex]);
    } else if (e.key === "Backspace") {
      e.preventDefault();
      resetPart(selectedPart);
    } else if (!isNaN(parseInt(e.key))) {
      e.preventDefault();
      handleInput(e.key);
    }
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>
  ) => {
    const cursorPosition = e.currentTarget.selectionStart;
    const part = cursorPosition ? partFromCursor(cursorPosition) : DatePart.Day;
    highlightPart(part);
  };

  const handleBlur = () => {
    if (
      !isValidDate(
        parseInt(day.value),
        parseInt(month.value),
        parseInt(year.value)
      )
    ) {
      setDay({
        value: "",
        shouldReplace: true,
      });
      setMonth({
        value: "",
        shouldReplace: true,
      });
      setYear({
        value: "",
        shouldReplace: true,
      });
    }

    if (parseInt(year.value) < LOWER_YEAR_LIMIT) {
      setYear({
        value: LOWER_YEAR_LIMIT.toString(),
        shouldReplace: true,
      });
    } else if (parseInt(year.value) > currentDate.getFullYear()) {
      setYear({
        value: currentDate.getFullYear().toString(),
        shouldReplace: true,
      });
    }
  };

  useEffect(() => {
    highlightPart(selectedPart);
  }, [day, month, year]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex ">
        <Input
          className="rounded-r-none"
          type="text"
          onKeyDown={handleKeyDown}
          onMouseUp={handleFocus}
          onBlur={handleBlur}
          ref={inputRef}
          value={formatDate(day, month, year)}
        />
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-l-none border-l-0"
          >
            <CalendarIcon className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            if (!date) return;
            setDay({
              value: format(date, "dd"),
              shouldReplace: true,
            });
            setMonth({
              value: format(date, "MM"),
              shouldReplace: true,
            });
            setYear({
              value: format(date, "yyyy"),
              shouldReplace: true,
            });
            setOpen(false);
          }}
          month={date}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
