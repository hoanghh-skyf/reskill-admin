import { z } from "zod";

const signInSchema = z
  .object({
    email: z.string().trim().min(1, "Email or username is required"),
    password: z.string().trim().min(1, "Password is required"),
  })
  .required();

export type TSignInSchema = z.infer<typeof signInSchema>;
export { signInSchema };
