"use client";

import { Fragment } from "react";
import { APP_NAME, APP_VERSION } from "@/shared/constants";
import { cn } from "@/shared/lib/utils";
import { AppPingIndicator } from "../ui/app-ping-indicator";

const FOOTER_LINKS = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Contact Us" },
  { href: "#", label: "Support" },
] as const;

interface FooterProps {
  productName?: string;
  version?: string;
  className?: string;
}

const Footer = ({
  productName = APP_NAME,
  version = APP_VERSION,
  className,
}: FooterProps) => {
  return (
    <footer
      className={cn(
        "footer-top-accent fixed bottom-0 left-0 right-0 z-10 w-full overflow-hidden bg-gray-100 pt-3",
        className,
      )}
    >
      <div className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8 sm:py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="font-semibold tracking-wide font-sans text-foreground">
              {productName}
            </span>
            <span className="ml-0.5 text-xs font-semibold text-muted-foreground">
              © 2026
            </span>
          </div>

          <nav
            className="hidden items-center gap-5 sm:flex"
            aria-label="Footer"
          >
            {FOOTER_LINKS.map((link, i) => (
              <Fragment key={link.label}>
                {i > 0 ? (
                  <div className="h-3 w-px shrink-0 bg-border" aria-hidden />
                ) : null}
                <a
                  href={link.href}
                  className="relative text-xs tracking-wide text-muted-foreground transition-colors duration-200 after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:h-[1.5px] after:origin-left after:scale-x-0 after:rounded-sm after:bg-primary after:transition-transform after:duration-220 after:ease-in-out hover:text-primary hover:after:scale-x-100"
                >
                  {link.label}
                </a>
              </Fragment>
            ))}
          </nav>

          <div className="group flex cursor-default items-center overflow-hidden rounded-lg border border-border transition-colors duration-200 hover:border-primary/50 relative pr-1.5">
            <span className="border-r border-border bg-muted px-[9px] py-1.5 text-[10px] font-medium uppercase leading-none tracking-widest text-muted-foreground transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
              version
            </span>
            <span className="bg-background px-2.5 py-[5px] text-xs font-medium leading-none text-primary transition-colors duration-200 group-hover:text-primary">
              {version}
            </span>
            <AppPingIndicator
              className="right-1.5 top-1/2 -translate-y-1/2"
              size={6}
              variant="live"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
