export const APP_ROUTERS = {
  AUTH: {
    LOGIN: {
      PATH: "/",
      NAME: "Login",
    },
    VERIFY_LOGIN_OTP: {
      PATH: "/otp",
      NAME: "Verify Login OTP",
    },
    REGISTER: {
      PATH: "/register",
      NAME: "Register",
    },
    FORGOT_PASSWORD: {
      PATH: "/forgot-password",
      NAME: "Forgot Password",
    },
    RESET_PASSWORD: {
      PATH: "/reset-password",
      NAME: "Reset Password",
    },
  },
  HOME: {
    PATH: "/",
    NAME: "Home",
  },
  STATISTICS: {
    PATH: "/statistics",
    NAME: "Statistics",
  },
  MANAGEMENT: {
    PATH: "/management",
    NAME: "Management",
  },
} as const;

export const AUTHENTICATED_ENTRY_PATH = APP_ROUTERS.MANAGEMENT.PATH;

export const UNAUTHENTICATED_ENTRY_PATH = APP_ROUTERS.AUTH.LOGIN.PATH;

export const AUTH_ROUTE_PATHS: readonly string[] = [
  APP_ROUTERS.AUTH.LOGIN.PATH,
  APP_ROUTERS.AUTH.REGISTER.PATH,
  APP_ROUTERS.AUTH.VERIFY_LOGIN_OTP.PATH,
  APP_ROUTERS.AUTH.FORGOT_PASSWORD.PATH,
  APP_ROUTERS.AUTH.RESET_PASSWORD.PATH,
];

export const PROTECTED_ROUTE_PREFIXES: readonly string[] = [
  APP_ROUTERS.MANAGEMENT.PATH,
  APP_ROUTERS.STATISTICS.PATH,
];
