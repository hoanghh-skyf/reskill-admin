"use client";

import { ShieldQuestion } from "lucide-react";

import ForgotPasswordForm from "@/components/features/auth/forgot-password-form";
import AuthLayout from "@/components/layouts/auth-layout";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Forgot Password?"
      description="No worries, we'll send you reset instructions."
      icon={
        <ShieldQuestion size={40} className="text-primary" strokeWidth={1.5} />
      }
      bgText="Forgot"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
