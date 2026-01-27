import { Barlow } from "next/font/google";
import { sinter } from "@/styles/fonts";
import "../styles/globals.css";

import type { Metadata } from "next";

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
        {children}
      </body>
    </html>
  );
}
