import {
  type MutationKey,
  type UseMutationOptions,
  useMutation,
} from "@tanstack/react-query";
import { EResponseStatus } from "@/shared/constants";
import type { TError } from "@/shared/lib/errors";
import { resetPasswordAction } from "../actions.server";
import type { TResetPasswordSchema } from "../schemas";

type TUseResetPasswordParams = {
  key?: MutationKey;
} & UseMutationOptions<
  unknown,
  TError,
  { resetPasswordBody: TResetPasswordSchema; token: string }
>;

export const useResetPassword = ({
  key,
  onError,
  onSuccess,
  ...options
}: TUseResetPasswordParams = {}) =>
  useMutation({
    mutationKey: key ?? ["reset-password"],
    mutationFn: async ({
      resetPasswordBody,
      token,
    }: {
      resetPasswordBody: TResetPasswordSchema;
      token: string;
    }) => {
      const res = await resetPasswordAction({ resetPasswordBody, token });
      if (res.status !== EResponseStatus.SUCCESS) {
        throw res.data;
      }
      return res.data;
    },
    onError: onError ?? (() => {}),
    onSuccess: onSuccess ?? (() => {}),
    ...options,
  });
