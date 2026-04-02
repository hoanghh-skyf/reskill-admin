import type { DefaultJWT } from "@auth/core/jwt";
import type { DefaultSession } from "next-auth";
import type { EUserRole } from "@/shared/constants";

type AuthUser = {
  id: string;
  email: string;
  role: EUserRole;
  is_active: boolean;
};

declare module "next-auth" {
  interface User extends AuthUser {}

  interface Session extends DefaultSession {
    user: AuthUser;
    access_token?: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT extends DefaultJWT {
    user: AuthUser;
    access_token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: AuthUser;
    access_token?: string;
  }
}
