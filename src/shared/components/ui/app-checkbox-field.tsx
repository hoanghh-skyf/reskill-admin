import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/shared/lib/utils/index";

import AppCheckbox from "./app-checkbox";
import {
  AppField,
  AppFieldContent,
  AppFieldDescription,
  AppFieldLabel,
} from "./app-field";

interface AppCheckboxFieldProps extends ComponentProps<typeof AppCheckbox> {
  label: ReactNode;
  description?: ReactNode;
  fieldProps?: Omit<ComponentProps<typeof AppField>, "children">;
}

const AppCheckboxField = ({
  label,
  description,
  id,
  fieldProps,
  ...props
}: AppCheckboxFieldProps) => {
  return (
    <AppField
      orientation="horizontal"
      {...fieldProps}
      className={cn(fieldProps?.className)}
    >
      <AppCheckbox id={id} {...props} />
      <AppFieldContent>
        <AppFieldLabel htmlFor={id}>{label}</AppFieldLabel>
        {description && (
          <AppFieldDescription>{description}</AppFieldDescription>
        )}
      </AppFieldContent>
    </AppField>
  );
};

export default AppCheckboxField;
