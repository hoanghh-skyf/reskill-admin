import { Barlow } from "next/font/google";
import "@/shared/styles/globals.css";

import type { Metadata } from "next";
import QueryProvider from "@/shared/providers/query.provider";
import SessionProvider from "@/shared/providers/session.provider";
import SonnerProvider from "@/shared/providers/sonner.provider";
import { sinter } from "@/shared/styles/fonts";

export const metadata: Metadata = {
  title: "Re-Skill",
  description: "Re-Skill",
};

const barlow = Barlow({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-barlow",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${sinter.variable} ${barlow.variable} font-barlow antialiased`}
      >
        <QueryProvider>
          <SessionProvider>
            <SonnerProvider>{children}</SonnerProvider>
          </SessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
