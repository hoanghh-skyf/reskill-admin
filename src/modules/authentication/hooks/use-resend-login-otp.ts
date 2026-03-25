import {
  type MutationKey,
  type UseMutationOptions,
  useMutation,
} from "@tanstack/react-query";
import { EResponseStatus } from "@/shared/constants";
import type { TError } from "@/shared/types";
import { resendLoginOTPAction } from "../actions";
import type { TResendLoginOTPSchema } from "../schemas";

type TUseResendLoginOTPParams = {
  key?: MutationKey;
} & UseMutationOptions<unknown, TError, TResendLoginOTPSchema>;

export const useResendLoginOTP = ({
  key,
  onError,
  onSuccess,
  ...options
}: TUseResendLoginOTPParams = {}) =>
  useMutation({
    mutationKey: key ?? ["resend-login-otp"],
    mutationFn: async (resendLoginOTPBody: TResendLoginOTPSchema) => {
      const res = await resendLoginOTPAction({ resendLoginOTPBody });
      if (res.status !== EResponseStatus.SUCCESS) {
        throw res.data;
      }
      return res.data;
    },
    onError: onError ?? (() => {}),
    onSuccess: onSuccess ?? (() => {}),
    ...options,
  });
