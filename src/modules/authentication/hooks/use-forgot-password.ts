import {
  type MutationKey,
  type UseMutationOptions,
  useMutation,
} from "@tanstack/react-query";
import { appToast } from "@/shared/components/ui/app-sonner";
import { EResponseStatus } from "@/shared/constants";
import type { TError } from "@/shared/lib/errors";
import { forgotPasswordAction } from "../actions.server";
import type { TForgotPasswordSchema } from "../schemas";

type TUseForgotPasswordParams = {
  key?: MutationKey;
} & UseMutationOptions<unknown, TError, TForgotPasswordSchema>;

export const useForgotPassword = ({
  key,
  onError,
  onSuccess,
  ...options
}: TUseForgotPasswordParams = {}) =>
  useMutation({
    mutationKey: key ?? ["forgot-password"],
    mutationFn: async (forgotPasswordBody: TForgotPasswordSchema) => {
      const res = await forgotPasswordAction({ forgotPasswordBody });
      if (res.status !== EResponseStatus.SUCCESS) {
        throw res.data;
      }
      return res.data;
    },
    onError: onError ?? (() => {}),
    onSuccess:
      onSuccess ??
      (() => {
        appToast.success("Reset link sent", {
          description: "Please check your email to get the reset link",
        });
      }),
    ...options,
  });
