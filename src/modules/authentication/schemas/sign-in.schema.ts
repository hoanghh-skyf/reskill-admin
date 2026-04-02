import { z } from "zod";

const signInSchema = z
  .object({
    email: z.email("Invalid email address").trim().min(1, "Email is required"),
    password: z.string().trim().min(1, "Password is required"),
  })
  .required();

export type TSignInSchema = z.infer<typeof signInSchema>;
export { signInSchema };
