import { z } from "zod";

export const newProjectSchema = z.object({
  workspaceName: z.enum(["Personal", "Waitify", "Bervy"]).default("Personal"),
  projectName: z
    .string({ required_error: "Workspace name is required" })
    .describe("Waitlist Name"),
  projectSlug: z
    .string({ required_error: "Project slug is required" })
    .describe("Waitlist Slug"),
  addCustomDomain: z.object({
    customDomain: z
      .union([z.string().url(), z.literal("")])
      .describe("Custom domain")
      .optional(),
  }),
  startAndEndDate: z
    .object({
      startDate: z.coerce
        .date()
        .refine((data) => data > new Date(), {
          message: "Start date must be in the future",
        })
        .optional(),
      endDate: z.coerce.date().optional(),
    })
    .describe("hello")
    .refine(
      (data) =>
        !(data?.endDate && data?.startDate) || data.endDate > data.startDate,
      {
        message: "End date cannot be earlier than start date.",
        path: ["endDate"],
      },
    ),
});

export type TNewProjectSchema = z.infer<typeof newProjectSchema>;
