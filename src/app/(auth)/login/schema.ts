import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().describe("email").email(),
  password: z.string().describe("password").min(1, "Password is required"),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
