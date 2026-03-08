import { Separator } from "@/shared/components/base/separator";

interface AppSeparatorProps extends React.ComponentProps<typeof Separator> {}

const AppSeparator = ({ ...props }: AppSeparatorProps) => {
  return <Separator {...props} />;
};

export { AppSeparator };
export type { AppSeparatorProps };
