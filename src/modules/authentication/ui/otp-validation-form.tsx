"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { RefreshCwIcon, UnlockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  otpValidationSchema,
  type TOTPValidationSchema,
} from "@/modules/authentication/schemas";
import AppButton from "@/shared/components/ui/app-button";
import { AppCountdown } from "@/shared/components/ui/app-countdown";
import { AppFieldLabel } from "@/shared/components/ui/app-field";
import {
  AppInputOTP,
  AppInputOTPGroup,
  AppInputOTPSlot,
} from "@/shared/components/ui/app-input-otp";
import { appToast } from "@/shared/components/ui/app-sonner";
import { APP_ROUTERS } from "@/shared/constants";
import { actionWithError } from "@/shared/lib/errors";
import { range } from "@/shared/lib/utils";
import { useResendLoginOTP, useVerifyLoginOTP } from "../hooks";
import useVerifyOtpStore from "../stores/verify-otp.store";

const OTPValidationForm = ({ token }: { token: string }) => {
  const router = useRouter();
  const resendAfter = useVerifyOtpStore((state) => state.resendAfter);
  const setSecondsToResend = useVerifyOtpStore(
    (state) => state.setSecondsToResend,
  );

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm<TOTPValidationSchema>({
    resolver: zodResolver(otpValidationSchema),
  });

  const { mutate: resendLoginOTP, isPending: isResendLoginOTPPending } =
    useResendLoginOTP({
      onSuccess: () => {
        appToast.success("Code resend successfully", {
          description:
            "Please check your email for the verification code to login.",
        });
        clearErrors("code");
        setValue("code", "");
      },
      onError: (error) => {
        actionWithError({
          error,
          onError(error) {
            if (error.error?.code && Number(error.error.code)) {
              setSecondsToResend(Number(error.error.code));
            }
            setError("code", {
              message: error.message,
            });
          },
        });
      },
    });

  const { mutate: verifyLoginOTP, isPending: isVerifyLoginOTPPending } =
    useVerifyLoginOTP({
      onSuccess: () => router.push(APP_ROUTERS.STATISTICS.PATH),
      onError: (error) => {
        actionWithError({
          error,
          setError,
        });
      },
    });

  return (
    <form
      className="w-full"
      onSubmit={handleSubmit(async (data) =>
        verifyLoginOTP({ token, otp: data.code }),
      )}
    >
      <div className="flex items-center justify-between w-full mb-4">
        <AppFieldLabel htmlFor="otp-verification">
          Verification code
        </AppFieldLabel>
        <AppButton
          variant="outline"
          size="xs"
          className=""
          type="button"
          onClick={() => resendLoginOTP({ token })}
          isLoading={isResendLoginOTPPending}
          disabled={resendAfter > 0}
        >
          <RefreshCwIcon />
          <p>Resend Code</p>
        </AppButton>
      </div>
      <AppInputOTP
        maxLength={6}
        id="otp-verification"
        required
        name="code"
        value={watch("code")}
        pattern={REGEXP_ONLY_DIGITS}
        onChange={(otpValue) => setValue("code", otpValue)}
      >
        <AppInputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-15 *:data-[slot=input-otp-slot]:text-lg flex justify-center w-full">
          {range(6).map((index) => (
            <AppInputOTPSlot
              key={index}
              index={index}
              aria-invalid={!!errors.code}
            />
          ))}
        </AppInputOTPGroup>
      </AppInputOTP>
      {errors.code?.message && (
        <p className="text-xs font-medium tracking-wide text-destructive w-full text-left mt-1">
          {errors.code.message}
        </p>
      )}
      {resendAfter > 0 && (
        <p className="text-xs font-medium tracking-wide text-destructive w-full text-left mt-1">
          You just resend an OTP code. Please try again after{" "}
          <AppCountdown
            initialSeconds={resendAfter}
            displayMode="seconds"
            onFinish={() => setSecondsToResend(0)}
          />{" "}
          seconds.
        </p>
      )}

      <div className="flex-center w-full">
        <AppButton
          className="px-8! rounded-sm! mt-6"
          isLoading={isVerifyLoginOTPPending}
        >
          <UnlockKeyhole />
          <p>Verify</p>
        </AppButton>
      </div>
    </form>
  );
};

export default OTPValidationForm;
