import {
  type MutationKey,
  type UseMutationOptions,
  useMutation,
} from "@tanstack/react-query";
import { EResponseStatus } from "@/shared/constants";
import type { TError } from "@/shared/lib/errors";
import { verifyLoginOTPAction } from "../actions.server";
import type { TVerifyLoginOTPDataSource } from "../data_source/response.data_source";
import type { TVerifyLoginOTPSchema } from "../schemas";

type TUseVerifyLoginOTPParams = {
  key?: MutationKey;
} & UseMutationOptions<
  TVerifyLoginOTPDataSource,
  TError,
  TVerifyLoginOTPSchema
>;

export const useVerifyLoginOTP = ({
  key,
  onError,
  onSuccess,
  ...options
}: TUseVerifyLoginOTPParams = {}) =>
  useMutation({
    mutationKey: key ?? ["verify-login-otp"],
    mutationFn: async (verifyLoginOTPBody: TVerifyLoginOTPSchema) => {
      const res = await verifyLoginOTPAction({ verifyLoginOTPBody });
      if (res.status !== EResponseStatus.SUCCESS) {
        throw res.data;
      }
      return res.data as TVerifyLoginOTPDataSource;
    },
    onError: onError ?? (() => {}),
    onSuccess: onSuccess ?? (() => {}),
    ...options,
  });
