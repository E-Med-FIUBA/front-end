import * as React from "react";
import { type FieldError } from "react-hook-form";

import { Error } from "./error";
import { Label } from "./label";

type FieldWrapperProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
  id?: string;
};

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  "className" | "children"
>;

export const FieldWrapper = ({
  label,
  error,
  children,
  id,
}: FieldWrapperProps) => {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      {children}
      <Error errorMessage={error?.message} />
    </div>
  );
};
