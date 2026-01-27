"use client";

import { ShieldCheck } from "lucide-react";

import ResetPasswordForm from "@/components/features/auth/reset-password-form";
import AuthLayout from "@/components/layouts/auth-layout";

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Set new password"
      description="Your new password must be different from previously used passwords."
      icon={
        <ShieldCheck size={40} className="text-primary" strokeWidth={1.5} />
      }
      bgText="Reset"
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}
