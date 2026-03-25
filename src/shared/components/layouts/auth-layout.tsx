import type { ReactNode } from "react";
import { AppMetadata } from "@/shared/components/ui/app-metadata";

interface AuthLayoutProps {
  children: ReactNode;
  icon?: ReactNode;
  bgText?: string;
  title?: string;
  description?: string;
  name?: string | null;
}

const AuthLayout = ({
  children,
  icon,
  bgText = "Log in",
  title = "Welcome back",
  description = "Log into your ReSkill account",
  name = null,
}: AuthLayoutProps) => {
  const resolvedName =
    typeof name === "string" && name.trim().length > 0 ? name.trim() : title;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4">
      <AppMetadata name={resolvedName} description={description} />
      <div className="flex flex-col items-center w-full max-w-[360px] z-1">
        <div className="relative">
          {icon}
          <p className="text-[25vw] sm:text-[160px] leading-[60px] sm:leading-[120px] tracking-tight uppercase font-semibold opacity-[0.025] select-none pointer-events-none absolute top-[32%] -translate-y-1/3 left-1/2 whitespace-nowrap -translate-x-1/2 z-0 font-sans">
            {bgText}
          </p>
        </div>
        <h2 className="text-[28px] font-bold mt-2 mb-1">{title}</h2>
        <p className="text-sm tracking-wide mb-10 text-center">{description}</p>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
