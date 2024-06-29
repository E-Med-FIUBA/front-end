import * as React from "react";

import { cn } from "@/utils/cn";
import { FieldError } from "react-hook-form";

const HelperText = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-sm text-destructive">{children}</p>;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {

    console.log(error);
    return (
      <div>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-destructive" : "border-input",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && error.message && (
          <HelperText>{error.message}</HelperText>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
