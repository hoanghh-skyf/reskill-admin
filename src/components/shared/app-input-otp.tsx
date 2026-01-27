import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import * as UI from "../ui/input-otp";

export const AppInputOTP = (props: ComponentProps<typeof UI.InputOTP>) => {
  return <UI.InputOTP {...props} className={cn(props.className)} />;
};
export const AppInputOTPGroup = (
  props: ComponentProps<typeof UI.InputOTPGroup>,
) => {
  return <UI.InputOTPGroup {...props} className={cn(props.className)} />;
};

export const AppInputOTPSlot = (
  props: ComponentProps<typeof UI.InputOTPSlot>,
) => {
  return (
    <UI.InputOTPSlot
      {...props}
      className={cn(
        "data-[active=true]:border-primary/50 data-[active=true]:ring-primary/20",
        props.className,
      )}
    />
  );
};

export const AppInputOTPSeparator = (
  props: ComponentProps<typeof UI.InputOTPSeparator>,
) => {
  return <UI.InputOTPSeparator {...props} className={cn(props.className)} />;
};
