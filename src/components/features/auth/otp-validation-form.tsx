import { yupResolver } from "@hookform/resolvers/yup";
import { RefreshCwIcon, UnlockKeyhole } from "lucide-react";
import { useForm } from "react-hook-form";
import AppButton from "@/components/shared/app-button";
import { AppFieldLabel } from "@/components/shared/app-field";
import {
  AppInputOTP,
  AppInputOTPGroup,
  AppInputOTPSlot,
} from "@/components/shared/app-input-otp";

import {
  otpValidationSchema,
  type TOTPValidationSchema,
} from "@/schemas/auth.schema";

import { range } from "@/utils/index";

const OTPValidationForm = () => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TOTPValidationSchema>({
    resolver: yupResolver(otpValidationSchema),
  });

  const onSubmit = (data: TOTPValidationSchema) => console.log(data);

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-between w-full mb-4">
        <AppFieldLabel htmlFor="otp-verification">
          Verification code
        </AppFieldLabel>
        <AppButton variant="outline" size="xs" className="">
          <RefreshCwIcon />
          <p>Resend Code</p>
        </AppButton>
      </div>
      <AppInputOTP
        maxLength={6}
        id="otp-verification"
        required
        value={watch("otp")}
        onChange={(otpValue) => setValue("otp", otpValue)}
      >
        <AppInputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-15 *:data-[slot=input-otp-slot]:text-lg flex justify-center w-full">
          {range(6).map((index) => (
            <AppInputOTPSlot
              key={index}
              index={index}
              aria-invalid={!!errors.otp}
            />
          ))}
        </AppInputOTPGroup>
      </AppInputOTP>
      {errors && (
        <p className="text-xs font-medium tracking-wide text-destructive w-full text-left mt-1">
          {errors.otp?.message}
        </p>
      )}

      <div className="flex-center w-full">
        <AppButton className="px-8! rounded-sm! mt-6">
          <UnlockKeyhole />
          <p>Verify</p>
        </AppButton>
      </div>
    </form>
  );
};

export default OTPValidationForm;
