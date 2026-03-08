import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/utils/index";
import { Checkbox } from "../base/checkbox";

const AppCheckbox = (props: ComponentProps<typeof Checkbox>) => {
  return <Checkbox {...props} className={cn(props.className)} />;
};

export default AppCheckbox;
