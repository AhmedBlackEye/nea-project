import { checkIfCampaignSlugExists } from "@/lib/queries/campaign";
import { z } from "zod";

export const newProjectSchema = z
  .object({
    workspaceId: z.string().min(1, "Workspace name is required"),
    name: z.string().min(1, "Waitlist name is required"),
    slug: z
      .string()
      .min(1, "Waitlist slug is required")
      .min(3, "Minimum length is 3")
      .refine(
        async (value) => {
          const exists = await checkIfCampaignSlugExists(value);
          return !exists;
        },
        { message: "Already exists, try another one." },
      ),
    description: z.string().optional(),
    customURL: z.union([z.string().url(), z.literal("")]).optional(),

    startAt: z.coerce.date().optional(),
    endsAt: z.coerce.date().optional(),
  })
  .refine(
    (data) => !(data?.endsAt && data?.startAt) || data.endsAt > data.startAt,
    {
      message: "End date cannot be earlier than start date.",
      path: ["endsAt"],
    },
  );

export type TNewProjectSchema = z.infer<typeof newProjectSchema>;
