import { z } from "zod";

const otpValidationSchema = z.object({
  code: z.string().trim().length(6, "Please enter the complete 6-digit code"),
});

const resendLoginOTPSchema = z.object({
  token: z.string().trim(),
});

const verifyLoginOTPSchema = z.object({
  token: z.string().trim(),
  otp: z.string().trim().length(6, "Please enter the complete 6-digit code"),
});

export type TOTPValidationSchema = z.infer<typeof otpValidationSchema>;
export type TResendLoginOTPSchema = z.infer<typeof resendLoginOTPSchema>;
export type TVerifyLoginOTPSchema = z.infer<typeof verifyLoginOTPSchema>;
export { otpValidationSchema, resendLoginOTPSchema, verifyLoginOTPSchema };
