"use client";

import {
  type MutationKey,
  type UseMutationOptions,
  useMutation,
} from "@tanstack/react-query";
import { EResponseStatus } from "@/shared/constants";
import type { TError } from "@/shared/types";
import { signInAction } from "../actions";
import type { TSignInResponseDto } from "../dtos";
import type { TSignInSchema } from "../schemas";

type TUseSignInParams = {
  key?: MutationKey;
} & UseMutationOptions<TSignInResponseDto, TError, TSignInSchema>;

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
      return res.data as TSignInResponseDto;
    },
    onError: onError ?? (() => {}),
    onSuccess: onSuccess ?? (() => {}),
    ...options,
  });
