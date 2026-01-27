import { type ComponentProps, forwardRef } from "react";

import { cn } from "@/lib/utils";
import * as UI from "../ui/input-group";

export const AppInputGroup = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof UI.InputGroup>
>((props, ref) => {
  return <UI.InputGroup {...props} ref={ref} className={cn(props.className)} />;
});
AppInputGroup.displayName = "AppInputGroup";

export const AppInputGroupAddon = (
  props: ComponentProps<typeof UI.InputGroupAddon>,
) => {
  return <UI.InputGroupAddon {...props} className={cn(props.className)} />;
};

export const AppInputGroupButton = (
  props: ComponentProps<typeof UI.InputGroupButton>,
) => {
  return <UI.InputGroupButton {...props} className={cn(props.className)} />;
};

export const AppInputGroupText = (
  props: ComponentProps<typeof UI.InputGroupText>,
) => {
  return <UI.InputGroupText {...props} className={cn(props.className)} />;
};

export const AppInputGroupInput = forwardRef<
  HTMLInputElement,
  ComponentProps<typeof UI.InputGroupInput>
>((props, ref) => {
  return (
    <UI.InputGroupInput {...props} ref={ref} className={cn(props.className)} />
  );
});
AppInputGroupInput.displayName = "AppInputGroupInput";

export const AppInputGroupTextarea = (
  props: ComponentProps<typeof UI.InputGroupTextarea>,
) => {
  return <UI.InputGroupTextarea {...props} className={cn(props.className)} />;
};
