"use client";
import { AutoFormInputComponentProps } from "@/components/auto-form/types";
import AutoForm, { AutoFormSubmit } from "@components/auto-form";
import { SubmitHandler, useFieldArray, useFormContext } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { nanoid } from "nanoid";
import { Input } from "@/components/ui/input";
import { Shuffle } from "lucide-react";

const formSchema = z.object({
  workspaceName: z.enum(["Personal", "Waitify", "Bervy"]).default("Personal"),
  projectName: z
    .string({ required_error: "Workspace name is required" })
    .describe("Workspace Name"),
  projectSlug: z
    .string({ required_error: "Project slug is required" })
    .describe("Project slug"),
  addCustomDomain: z
    .object({
      customDomain: z
        .union([z.string().url(), z.literal("")])
        .describe("Custom domain"),
    })
    .optional(),
  startAndExpirationDate: z
    .object({
      startDate: z.coerce
        .date()
        .refine((data) => data > new Date(), {
          message: "Start date must be in the future",
        })
        .optional(),
      endDate: z.coerce.date().optional(),
    })
    .optional()
    .refine(
      (data) =>
        !(data?.endDate && data?.startDate) || data.endDate > data.startDate,
      {
        message: "End date cannot be earlier than start date.",
        path: ["endDate"],
      },
    ),
});

export default function NewWorkspaceForm() {
  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    formData,
  ) => {
    console.log(formData);
    // close();
  };
  return (
    <AutoForm
      formSchema={formSchema}
      onSubmit={onSubmit}
      fieldConfig={{
        workspaceName: {
          tooltip: "Your project will live inside this workspace",
        },
        projectSlug: {
          fieldType: ProjectSlugInput,
        },
      }}
    >
      <AutoFormSubmit className="float-end">
        Create a new project
      </AutoFormSubmit>
    </AutoForm>
  );
}

function ProjectSlugInput({ field }: AutoFormInputComponentProps) {
  const { setValue } = useFormContext();

  function handleOnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setValue("projectSlug", nanoid(11), { shouldValidate: false });
  }

  return (
    <FormItem>
      <div className="flex items-center  justify-between ">
        <FormLabel>Waitlist slug</FormLabel>
        <button
          className="flex items-center gap-1 text-sm text-primary decoration-2 hover:underline"
          onClick={handleOnClick}
        >
          <Shuffle className="h-4 w-4" /> Randomize
        </button>
      </div>
      <FormControl>
        <Input placeholder="my_waitlist" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
