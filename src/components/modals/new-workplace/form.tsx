"use client";
import { toast } from "@/components/ui/use-toast";
import { createNewWorkspace } from "@/lib/queries/workspaces";
import AutoForm, { AutoFormSubmit } from "@components/auto-form";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string({ required_error: "Workspace name is required" })
    .describe("Workspace Name"),
  description: z.string().optional(),
});

export default function NewWorkspaceForm({ close }: { close: () => void }) {
  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    formData,
  ) => {
    const { error } = await createNewWorkspace({
      workspaceData: {
        name: formData.name,
        description: formData.description as string,
      },
    });
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please try again or contact us if the issue presists.",
      });
    } else {
      toast({
        description: "Workspace created successfully.",
      });
    }
    close();
  };
  return (
    <AutoForm
      formSchema={formSchema}
      onSubmit={onSubmit}
      fieldConfig={{
        name: {
          inputProps: {
            placeholder: "Work, hobbies...",
          },
        },
        description: {
          fieldType: "textarea",
          inputProps: {
            placeholder: "Waiting list app that...",
          },
        },
      }}
    >
      <AutoFormSubmit className="float-end">
        Create a new workspace
      </AutoFormSubmit>
    </AutoForm>
  );
}
