import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().describe("email").min(1, "Email is required").email(),
  password: z
    .string()
    .describe("password")
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
