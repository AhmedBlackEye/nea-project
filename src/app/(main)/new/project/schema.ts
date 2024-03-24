import { z } from "zod";

export const newProjectSchema = z
  .object({
    workspaceName: z.string().min(1, "Workspace name is required"),
    projectName: z.string().min(1, "Waitlist name is required"),
    projectSlug: z.string().min(1, "Waitlist slug is required"),
    description: z.string().optional(),
    customDomain: z.string().url().describe("Custom domain").optional(),

    startDate: z.coerce
      .date()
      .refine((data) => data > new Date(), {
        message: "Start date must be in the future",
      })
      .optional(),
    endDate: z.coerce.date().optional(),
  })
  .refine(
    (data) =>
      !(data?.endDate && data?.startDate) || data.endDate > data.startDate,
    {
      message: "End date cannot be earlier than start date.",
      path: ["endDate"],
    },
  );

export type TNewProjectSchema = z.infer<typeof newProjectSchema>;
