import { yupResolver } from "@hookform/resolvers/yup";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";

import AppButton from "@/components/shared/app-button";
import AppInput from "@/components/shared/app-input";

import type { TForgotPasswordSchema } from "@/schemas/auth.schema";
import { forgotPasswordSchema } from "@/schemas/auth.schema";

const ForgotPasswordForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<TForgotPasswordSchema>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: TForgotPasswordSchema) => console.log(data);

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <AppInput
        placeholder="Enter your email"
        className="min-h-10"
        type="email"
        required
        {...register("email")}
        error={errors.email?.message}
      />

      <div className="flex-center w-full">
        <AppButton className="px-8! rounded-sm! mt-8 w-full">
          <Mail className="mr-2 h-4 w-4" />
          <p>Send Reset Link</p>
        </AppButton>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs font-medium tracking-wide text-zinc-500">
          Remember your password?{" "}
          <span className="text-primary hover:underline cursor-pointer font-medium">
            Log in
          </span>
        </p>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
