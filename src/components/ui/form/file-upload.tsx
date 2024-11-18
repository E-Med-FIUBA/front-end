import { Input, InputProps } from "@/components/ui/input"
import { Label } from "@radix-ui/react-dropdown-menu";
import React from "react";

const InputFile = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, hideArrows, name, ...props }, ref) => {
        return (
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label className="text-sm text-muted-foreground">
                    {props.placeholder} </Label>
                <Input id={name} name={name} type="file" ref={ref}
                    {...props} />
            </div>
        );
    },
);
InputFile.displayName = 'Input';

export { InputFile };