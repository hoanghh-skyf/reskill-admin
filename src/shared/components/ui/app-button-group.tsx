import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/utils/index";

import * as UI from "@/shared/components/base/button-group";

export const AppButtonGroup = (
  props: ComponentProps<typeof UI.ButtonGroup>,
) => {
  return <UI.ButtonGroup {...props} className={cn(props.className)} />;
};

export const AppButtonGroupText = (
  props: ComponentProps<typeof UI.ButtonGroupText>,
) => {
  return <UI.ButtonGroupText {...props} className={cn(props.className)} />;
};

export const AppButtonGroupSeparator = (
  props: ComponentProps<typeof UI.ButtonGroupSeparator>,
) => {
  return <UI.ButtonGroupSeparator {...props} className={cn(props.className)} />;
};
