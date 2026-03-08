import * as yup from "yup";

const signInSchema = yup
  .object({
    account: yup.string().trim().required("Email or username is required"),
    password: yup.string().trim().required("Password is required"),
  })
  .required();

export type TSignInSchema = yup.InferType<typeof signInSchema>;
export { signInSchema };

const otpValidationSchema = yup.object({
  otp: yup.string().trim().required("OTP is required"),
});

export type TOTPValidationSchema = yup.InferType<typeof otpValidationSchema>;
export { otpValidationSchema };

const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Invalid email"),
});

export type TForgotPasswordSchema = yup.InferType<typeof forgotPasswordSchema>;
export { forgotPasswordSchema };

const resetPasswordSchema = yup.object({
  password: yup.string().trim().required("Password is required"),
  confirmPassword: yup
    .string()
    .trim()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

export type TResetPasswordSchema = yup.InferType<typeof resetPasswordSchema>;
export { resetPasswordSchema };
