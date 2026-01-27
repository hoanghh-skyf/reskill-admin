import { type ComponentProps, forwardRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import {
  AppField,
  AppFieldContent,
  AppFieldDescription,
  AppFieldError,
  AppFieldLabel,
} from "./app-field";

interface AppInputProps extends ComponentProps<typeof Input> {
  label?: ReactNode;
  description?: ReactNode;
  error?: string | { message?: string };
  fieldProps?: Omit<ComponentProps<typeof AppField>, "children">;
}

const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  ({ label, description, error, fieldProps, ...props }, ref) => {
    const input = (
      <Input
        {...props}
        ref={ref}
        className={cn(props.className, "focus-visible:ring-0 rounded-sm")}
        aria-invalid={!!error || props["aria-invalid"]}
      />
    );

    const errorObj = typeof error === "string" ? { message: error } : error;

    return (
      <AppField
        {...fieldProps}
        data-invalid={!!error}
        className={cn(fieldProps?.className)}
      >
        {label && <AppFieldLabel htmlFor={props.id}>{label}</AppFieldLabel>}
        <AppFieldContent className="gap-1">
          {input}
          {description && (
            <AppFieldDescription>{description}</AppFieldDescription>
          )}
          {error && <AppFieldError errors={[errorObj]} />}
        </AppFieldContent>
      </AppField>
    );
  },
);
AppInput.displayName = "AppInput";

export default AppInput;
