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
} as const;
