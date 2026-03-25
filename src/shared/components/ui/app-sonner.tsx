import type { ToasterProps } from "sonner";
import { toast } from "sonner";
import { Toaster } from "@/shared/components/base/sonner";

export type AppSonnerProps = ToasterProps;

export const AppSonner = (props: AppSonnerProps) => {
  return <Toaster {...props} />;
};

export const appToast = toast;
