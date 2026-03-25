"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  signInSchema,
  type TSignInSchema,
} from "@/modules/authentication/schemas";
import AppButton from "@/shared/components/ui/app-button";
import AppCheckboxField from "@/shared/components/ui/app-checkbox-field";
import AppInput from "@/shared/components/ui/app-input";
import AppInputPassword from "@/shared/components/ui/app-input-password";
import { appToast } from "@/shared/components/ui/app-sonner";
import { APP_ROUTERS } from "@/shared/constants";
import { actionWithError } from "@/shared/lib/errors";
import { simpleEncode } from "@/shared/lib/utils";
import { useSignIn } from "../hooks";

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const { mutate: signIn, isPending } = useSignIn({
    onSuccess(data, variables) {
      const encodedToken = simpleEncode({
        token: data.verify_token,
        email: variables.email,
      });
      appToast.success("Email sent successfully", {
        description:
          "Please check your email for the verification code to login",
      });
      router.push(
        `${APP_ROUTERS.AUTH.VERIFY_LOGIN_OTP.PATH}?token=${encodedToken}`,
      );
    },
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

  return (
    <form className="w-full" onSubmit={handleSubmit((data) => signIn(data))}>
      <AppInput
        placeholder="Email"
        className="min-h-10"
        error={errors.email?.message || errors.root?.message}
        {...register("email")}
      />
      <AppInputPassword
        placeholder="Password"
        className="min-h-10 mt-4 mb-1"
        error={errors.password?.message || errors.root?.message}
        {...register("password")}
      />
      <button
        type="button"
        className="text-xs font-medium tracking-wide text-primary w-full text-right hover:underline cursor-pointer mb-2"
        onClick={() => router.push(APP_ROUTERS.AUTH.FORGOT_PASSWORD.PATH)}
      >
        Forgot password?
      </button>
      <AppCheckboxField
        label="Remember me"
        id="remember-me"
        name="remember-me"
      />
      <div className="flex-center w-full">
        <AppButton
          className="px-8! rounded-sm! mt-8"
          type="submit"
          isLoading={isPending}
        >
          <LogIn />
          <p>Log in</p>
        </AppButton>
      </div>
    </form>
  );
};

export default LoginForm;
