"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { LogIn } from "lucide-react";
import { useForm } from "react-hook-form";

import AppButton from "@/shared/components/ui/app-button";
import AppCheckboxField from "@/shared/components/ui/app-checkbox-field";
import AppInput from "@/shared/components/ui/app-input";
import AppInputPassword from "@/shared/components/ui/app-input-password";

import {
  signInSchema,
  type TSignInSchema,
} from "@/modules/authentication/schema";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInSchema>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = (data: TSignInSchema) => console.log(data);

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <AppInput
        placeholder="Email/Name"
        className="min-h-10"
        error={errors.account?.message}
        {...register("account")}
      />
      <AppInputPassword
        placeholder="Password"
        className="min-h-10 mt-4 mb-1"
        error={errors.password?.message}
        {...register("password")}
      />
      <p className="text-xs font-medium tracking-wide text-primary w-full text-right hover:underline cursor-pointer mb-2">
        Forgot password?
      </p>
      <AppCheckboxField
        label="Remember me"
        id="remember-me"
        name="remember-me"
      />
      <div className="flex-center w-full">
        <AppButton className="px-8! rounded-sm! mt-8" type="submit">
          <LogIn />
          <p>Log in</p>
        </AppButton>
      </div>
    </form>
  );
};

export default LoginForm;
