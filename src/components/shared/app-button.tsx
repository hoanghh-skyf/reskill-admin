import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

const AppButton = (props: ComponentProps<typeof Button>) => {
  return <Button {...props} className={cn(props.className)} />;
};

export default AppButton;
