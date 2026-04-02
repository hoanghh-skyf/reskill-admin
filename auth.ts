import { NextResponse } from "next/server";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { TGetMeResponseDto } from "@/modules/authentication/dtos";
import {
  API_ROUTES,
  AUTHENTICATED_ENTRY_PATH,
  EResponseStatus,
  UNAUTHENTICATED_ENTRY_PATH,
} from "@/shared/constants";
import apiClient from "@/shared/lib/api-client";
import type { TError } from "@/shared/lib/errors";
import {
  isAuthRoute,
  isProtectedRoute,
  normalizePathname,
} from "@/shared/lib/utils";
import type { TApiResponse } from "@/shared/types/common";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials) {
        const { token } = credentials;

        if (!token) {
          return null;
        }

        try {
          const res = await apiClient.get<TApiResponse<TGetMeResponseDto>>(
            API_ROUTES.AUTH.ME,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (res.data.status === EResponseStatus.ERROR) {
            const error = res.data as TError;
            throw new CredentialsSignin(error.message);
          }

          const data = res.data.data;

          if (!data) {
            throw new CredentialsSignin("User not found");
          }

          return {
            is_active: data.is_active,
            role: data.role,
            email: data.email,
            id: data.id,
            access_token: token,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // Like to middleware but for auth
    authorized({ request, auth }) {
      const pathname = normalizePathname(request.nextUrl.pathname);
      const isLoggedIn = Boolean(auth?.user);

      if (isLoggedIn && isAuthRoute(pathname)) {
        return NextResponse.redirect(
          new URL(AUTHENTICATED_ENTRY_PATH, request.nextUrl),
        );
      }

      if (!isLoggedIn && isProtectedRoute(pathname)) {
        return NextResponse.redirect(
          new URL(UNAUTHENTICATED_ENTRY_PATH, request.nextUrl),
        );
      }

      return true;
    },
    async jwt({ token, user }) {
      if (!user) {
        return token;
      }

      const accessToken = (user as { access_token?: string }).access_token;

      if (!accessToken) {
        return null;
      }

      const res = await apiClient.get<TApiResponse<TGetMeResponseDto>>(
        API_ROUTES.AUTH.ME,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const me = res.data.data;

      if (!me) {
        return null;
      }

      return {
        access_token: accessToken,
        user: me,
      };
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = {
          ...session.user,
          ...token.user,
        };
        session.access_token = token.access_token as string;
      }
      return session;
    },
  },
});
