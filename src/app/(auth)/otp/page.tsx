"use client";

import OTPValidationForm from "@/components/features/auth/otp-validation-form";
import { MobileActionOTPCodeIcon } from "@/components/icons";
import AuthLayout from "@/components/layouts/auth-layout";

const VerificationOTPPage = () => {
  return (
    <AuthLayout
      title="Verify your login"
      description="Enter the verification code we sent to your email address: m@example.com."
      icon={
        <MobileActionOTPCodeIcon
          size={40}
          className="text-primary"
          strokeWidth={0.3}
        />
      }
      bgText="Verify"
    >
      <OTPValidationForm />
    </AuthLayout>
  );
};

export default VerificationOTPPage;
