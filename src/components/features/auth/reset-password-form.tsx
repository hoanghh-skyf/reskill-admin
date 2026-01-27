import { yupResolver } from "@hookform/resolvers/yup";
import { KeyRound } from "lucide-react";
import { useForm } from "react-hook-form";

import AppButton from "@/components/shared/app-button";
import AppInputPassword from "@/components/shared/app-input-password";
import {
  resetPasswordSchema,
  type TResetPasswordSchema,
} from "@/schemas/auth.schema";

const ResetPasswordForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<TResetPasswordSchema>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = (data: TResetPasswordSchema) => console.log(data);

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <AppInputPassword
        placeholder="New password"
        className="min-h-10"
        required
        {...register("password")}
        error={errors.password?.message}
      />
      <AppInputPassword
        placeholder="Confirm new password"
        className="min-h-10 mt-4"
        required
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      <div className="flex-center w-full">
        <AppButton className="px-8! rounded-sm! mt-8 w-full">
          <KeyRound className="mr-2 h-4 w-4" />
          <p>Reset Password</p>
        </AppButton>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs font-medium tracking-wide text-zinc-500">
          Back to{" "}
          <span className="text-primary hover:underline cursor-pointer font-medium">
            Log in
          </span>
        </p>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
