"use client";
import AutoForm, { AutoFormSubmit } from "@components/auto-form";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  workspaceName: z
    .string({ required_error: "Workspace name is required" })
    .describe("Workspace Name"),
});

export default function NewWorkspaceForm({ close }: { close: () => void }) {
  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    formData,
    event,
  ) => {
    close();
  };
  return (
    <AutoForm formSchema={formSchema} onSubmit={onSubmit}>
      <AutoFormSubmit className="float-end">
        Create a new workspace
      </AutoFormSubmit>
    </AutoForm>
  );
}
