import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/utils/index";
import * as UI from "../base/field";

export const AppField = (props: ComponentProps<typeof UI.Field>) => {
  return <UI.Field {...props} className={cn(props.className)} />;
};

export const AppFieldLabel = (props: ComponentProps<typeof UI.FieldLabel>) => {
  return <UI.FieldLabel {...props} className={cn(props.className)} />;
};

export const AppFieldDescription = (
  props: ComponentProps<typeof UI.FieldDescription>,
) => {
  return <UI.FieldDescription {...props} className={cn(props.className)} />;
};

export const AppFieldError = (props: ComponentProps<typeof UI.FieldError>) => {
  return <UI.FieldError {...props} className={cn(props.className)} />;
};

export const AppFieldGroup = (props: ComponentProps<typeof UI.FieldGroup>) => {
  return <UI.FieldGroup {...props} className={cn(props.className)} />;
};

export const AppFieldLegend = (
  props: ComponentProps<typeof UI.FieldLegend>,
) => {
  return <UI.FieldLegend {...props} className={cn(props.className)} />;
};

export const AppFieldSeparator = (
  props: ComponentProps<typeof UI.FieldSeparator>,
) => {
  return <UI.FieldSeparator {...props} className={cn(props.className)} />;
};

export const AppFieldSet = (props: ComponentProps<typeof UI.FieldSet>) => {
  return <UI.FieldSet {...props} className={cn(props.className)} />;
};

export const AppFieldContent = (
  props: ComponentProps<typeof UI.FieldContent>,
) => {
  return <UI.FieldContent {...props} className={cn(props.className)} />;
};

export const AppFieldTitle = (props: ComponentProps<typeof UI.FieldTitle>) => {
  return <UI.FieldTitle {...props} className={cn(props.className)} />;
};
