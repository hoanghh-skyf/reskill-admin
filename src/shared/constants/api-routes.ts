export const API_ROUTES = {
  AUTH: {
    SIGN_IN: "/auth/sign-in",
    VERIFY_LOGIN_TOKEN: "/auth/verify-login-token",
    VERIFY_FORGOT_PASSWORD_TOKEN: "/auth/verify-reset-token",
    RESEND_LOGIN_TOKEN: "/auth/resend-otp",
    VERIFY_LOGIN_OTP: "/auth/confirm-otp",
    FORGOT_PASSWORD: "/auth/password/forgot",
    RESET_PASSWORD: "/auth/password/reset",
    ME: "/auth/me",
  },
} as const;
