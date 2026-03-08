"use client";

import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/utils/index";

import { Button } from "@/shared/components/base/button";

const AppButton = (props: ComponentProps<typeof Button>) => {
  return <Button {...props} className={cn(props.className)} />;
};

export default AppButton;
