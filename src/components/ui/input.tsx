import * as React from "react";

import { cn } from "@/utils/cn";
import { FieldError } from "react-hook-form";

const HelperText = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-sm text-destructive">{children}</p>;
};

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  hideArrows?: boolean;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, error, hideArrows, containerClassName, ...props },
    ref
  ) => {
    return (
      <div className={containerClassName}>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            hideArrows &&
              "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            error ? "border-destructive" : "border-input",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && error.message && <HelperText>{error.message}</HelperText>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
