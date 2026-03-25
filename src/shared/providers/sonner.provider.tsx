"use client";

import type { PropsWithChildren } from "react";

import { AppSonner } from "@/shared/components/ui/app-sonner";

type SonnerProviderProps = PropsWithChildren;

const SonnerProvider = ({ children }: SonnerProviderProps) => {
  return (
    <>
      {children}
      <AppSonner position="top-right" theme="light" />
    </>
  );
};

export default SonnerProvider;
