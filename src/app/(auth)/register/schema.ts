import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().describe("email").min(1, "Email is required").email(),
    password: z
      .string()
      .describe("password")
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().describe("Confirm Password"),
    rememberMe: z.boolean().default(false).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;
