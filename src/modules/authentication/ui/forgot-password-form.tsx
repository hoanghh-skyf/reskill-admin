"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { TForgotPasswordSchema } from "@/modules/authentication/schemas";
import { forgotPasswordSchema } from "@/modules/authentication/schemas";
import AppButton from "@/shared/components/ui/app-button";
import AppInput from "@/shared/components/ui/app-input";
import { APP_ROUTERS } from "@/shared/constants";
import { useForgotPassword } from "../hooks";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<TForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { mutateAsync: forgotPassword, isPending } = useForgotPassword();
  return (
    <form
      className="w-full"
      onSubmit={handleSubmit((data) => forgotPassword(data))}
    >
      <AppInput
        placeholder="Enter your email"
        className="min-h-10"
        type="email"
        required
        {...register("email")}
        error={errors.email?.message || errors.root?.message}
      />

      <div className="flex-center w-full">
        <AppButton
          className="px-8! rounded-sm! mt-8 w-full"
          isLoading={isPending}
          type="submit"
        >
          <Mail className="mr-2 h-4 w-4" />
          <p>Send Reset Link</p>
        </AppButton>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs font-medium tracking-wide text-zinc-500">
          Remember your password?{" "}
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
  );
};

export default ForgotPasswordForm;
