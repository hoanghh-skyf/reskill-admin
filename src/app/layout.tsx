import { Bitter, Inter_Tight } from "next/font/google";
import "@/globals.css";

import type { Metadata } from "next";
import { APP_DESCRIPTION, APP_NAME } from "@/constants";
import QueryProvider from "@/providers/query.provider";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

const bitter = Bitter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-bitter",
  preload: true,
});

const interTight = Inter_Tight({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
  preload: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`light ${bitter.variable} ${interTight.variable}`}
    >
      <body className="antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
