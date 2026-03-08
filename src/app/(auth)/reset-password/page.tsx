"use client";

import ResetPasswordForm from "@/modules/authentication/ui/reset-password-form";
import AuthLayout from "@/shared/components/layouts/auth-layout";
import { ShieldCheck } from "lucide-react";

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
