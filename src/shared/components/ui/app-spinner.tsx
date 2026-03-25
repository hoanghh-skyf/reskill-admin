import type React from "react";

import { Spinner } from "@/shared/components/base/spinner";

export interface AppSpinnerProps extends React.ComponentProps<typeof Spinner> {}

export const AppSpinner = ({ ...props }: AppSpinnerProps) => {
  return <Spinner {...props} />;
};
