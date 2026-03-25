"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  resetPasswordSchema,
  type TResetPasswordSchema,
} from "@/modules/authentication/schemas";
import AppButton from "@/shared/components/ui/app-button";
import AppInput from "@/shared/components/ui/app-input";
import AppInputPassword from "@/shared/components/ui/app-input-password";
import { appToast } from "@/shared/components/ui/app-sonner";
import { APP_ROUTERS } from "@/shared/constants";
import { actionWithError } from "@/shared/lib/errors";
import { useResetPassword } from "../hooks";

const ResetPasswordForm = ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    register,
    setError,
  } = useForm<TResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutate: resetPassword, isPending } = useResetPassword({
    onError: (error) => {
      actionWithError({
        error,
        onError(error) {
          actionWithError({
            error,
            onError(error) {
              setError("root", {
                message: error.message,
              });
            },
          });
        },
      });
    },
    onSuccess: () => {
      appToast.success("Password reset successfully", {
        description: "Please login with your new password",
      });
      router.push(APP_ROUTERS.AUTH.LOGIN.PATH);
    },
  });

  const onSubmit = (data: TResetPasswordSchema) => {
    resetPassword({ resetPasswordBody: data, token });
  };

  return (
    <div className="w-full">
      <AppInput
        placeholder="Email"
        className="min-h-10 mb-4"
        type="email"
        disabled
        defaultValue={email}
      />

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <AppInputPassword
          placeholder="New password"
          className="min-h-10"
          required
          {...register("password")}
          error={errors.password?.message || errors.root?.message}
        />
        <AppInputPassword
          placeholder="Confirm new password"
          className="min-h-10 mt-4"
          required
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message || errors.root?.message}
        />

        <div className="flex-center w-full">
          <AppButton
            className="px-8! rounded-sm! mt-8 w-full"
            isLoading={isPending}
            type="submit"
          >
            <KeyRound className="mr-2 h-4 w-4" />
            <p>Reset Password</p>
          </AppButton>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs font-medium tracking-wide text-zinc-500">
            Back to{" "}
            <button
              type="button"
              className="text-primary hover:underline cursor-pointer font-medium"
              onClick={() => router.push(APP_ROUTERS.AUTH.LOGIN.PATH)}
            >
              Log in
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
