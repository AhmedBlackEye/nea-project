import { z } from "zod";

export const newProjectSchema = z.object({
  orgranization: z.string().min(1, "Organization is required"),
  projectName: z.string().min(1, "Project name is required"),
  projectSlug: z.string().min(1, "Project slug is required"),
  emailNewSignups: z.boolean().default(true).optional(),
  startAtDate: z.date().optional(),
  endAtDate: z.date().optional(),
});

export type TNewProjectSchema = z.infer<typeof newProjectSchema>;
