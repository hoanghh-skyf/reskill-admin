import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";

const AppCheckbox = (props: ComponentProps<typeof Checkbox>) => {
  return <Checkbox {...props} className={cn(props.className)} />;
};

export default AppCheckbox;
