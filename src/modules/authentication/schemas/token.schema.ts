import { z } from "zod";
import { ETokenType } from "@/shared/constants";

const verifyTokenSchema = z.object({
  token: z.string().trim().min(1, "Token is required"),
  type: z.enum(ETokenType).default(ETokenType.LOGIN),
  email: z.string().trim().min(1, "Email is required"),
});

export type TVerifyTokenSchema = z.infer<typeof verifyTokenSchema>;
export { verifyTokenSchema };
