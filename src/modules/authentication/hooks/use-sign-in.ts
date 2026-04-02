"use client";

import {
  type MutationKey,
  type UseMutationOptions,
  useMutation,
} from "@tanstack/react-query";
import { EResponseStatus } from "@/shared/constants";
import type { TError } from "@/shared/lib/errors";
import { signInAction } from "../actions.server";
import type { TSignInDataSource } from "../data_source/response.data_source";
import type { TSignInSchema } from "../schemas";

type TUseSignInParams = {
  key?: MutationKey;
} & UseMutationOptions<TSignInDataSource, TError, TSignInSchema>;

export const useSignIn = ({
  key,
  onError,
  onSuccess,
  ...options
}: TUseSignInParams = {}) =>
  useMutation({
    mutationKey: key ?? ["sign-in"],
    mutationFn: async (signInBody: TSignInSchema) => {
      const res = await signInAction({ signInBody });
      if (res.status !== EResponseStatus.SUCCESS) {
        throw res.data;
      }
      return res.data as TSignInDataSource;
    },
    onError: onError ?? (() => {}),
    onSuccess: onSuccess ?? (() => {}),
    ...options,
  });
