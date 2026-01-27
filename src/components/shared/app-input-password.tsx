import { Eye, EyeOff } from "lucide-react";
import {
  type ComponentProps,
  forwardRef,
  type ReactNode,
  useState,
} from "react";

import { cn } from "@/lib/utils";

import {
  AppField,
  AppFieldContent,
  AppFieldDescription,
  AppFieldError,
  AppFieldLabel,
} from "./app-field";
import {
  AppInputGroup,
  AppInputGroupAddon,
  AppInputGroupButton,
  AppInputGroupInput,
} from "./app-input-group";

interface AppInputPasswordProps
  extends ComponentProps<typeof AppInputGroupInput> {
  label?: ReactNode;
  description?: ReactNode;
  error?: string | { message?: string };
  fieldProps?: Omit<ComponentProps<typeof AppField>, "children">;
}

const AppInputPassword = forwardRef<HTMLInputElement, AppInputPasswordProps>(
  ({ label, description, error, fieldProps, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
      setShowPassword((prev) => !prev);
    };

    const input = (
      <AppInputGroup
        className={cn(
          "has-[[data-slot=input-group-control]:focus-visible]:ring-0 rounded-sm",
          props.className,
        )}
      >
        <AppInputGroupInput
          {...props}
          ref={ref}
          type={showPassword ? "text" : "password"}
          className={cn("focus-visible:ring-0")}
          aria-invalid={!!error || props["aria-invalid"]}
        />
        <AppInputGroupAddon align="inline-end">
          <AppInputGroupButton
            aria-label={showPassword ? "Hide password" : "Show password"}
            title={showPassword ? "Hide password" : "Show password"}
            size="icon-xs"
            onClick={togglePassword}
            type="button"
            className="hover:bg-transparent"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </AppInputGroupButton>
        </AppInputGroupAddon>
      </AppInputGroup>
    );

    const errorObj = typeof error === "string" ? { message: error } : error;

    return (
      <AppField
        {...fieldProps}
        data-invalid={!!error}
        className={cn(fieldProps?.className)}
      >
        {label && <AppFieldLabel htmlFor={props.id}>{label}</AppFieldLabel>}
        <AppFieldContent className="gap-0">
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
AppInputPassword.displayName = "AppInputPassword";

export default AppInputPassword;
