"use client";

import { AutoFormInputComponentProps } from "@/components/auto-form/types";
import AutoForm, { AutoFormSubmit } from "@components/auto-form";
import { SubmitHandler, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { nanoid } from "nanoid";
import { Input } from "@/components/ui/input";
import { Info, Shuffle } from "lucide-react";
import { TNewProjectSchema, newProjectSchema } from "./schema";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { serverLog } from "@/lib/actions/auth";
import { toast } from "@/components/ui/use-toast";

export default function NewWorkspaceForm() {
  const onSubmit: SubmitHandler<TNewProjectSchema> = async (formData) => {
    await serverLog(formData);
    toast({
      title: "Scheduled: Catch up",
      description: "Friday, February 10, 2023 at 5:57 PM",
    });
    console.log(formData);
  };
  return (
    <AutoForm
      formSchema={newProjectSchema}
      onSubmit={onSubmit}
      fieldConfig={{
        workspaceName: {
          tooltip: "Your project will live inside this workspace",
        },
        projectName: {
          tooltip: "Give a name to your waitlist",
          inputProps: {
            placeholder: "My waitlist",
          },
        },
        projectSlug: {
          fieldType: ProjectSlugInput,
        },
        addCustomDomain: {
          customDomain: {
            inputProps: {
              placeholder: "mywebsite.com",
            },
          },
        },
        startAndEndDate: {
          startDate: {
            tooltip: "The date your waitlist will be published",
          },
          endDate: {
            tooltip: "The date your waitlist will be expired",
          },
        },
      }}
    >
      <AutoFormSubmit className="w-full">Create a new waitlist</AutoFormSubmit>
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
        <FormLabel className="flex items-center gap-1">
          Waitlist Slug
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 stroke-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              The ID of your waitlist e.g. Waitify.com/waitlist/my_waitlist
            </TooltipContent>
          </Tooltip>
        </FormLabel>
        <button
          className="flex items-center gap-1 text-sm text-primary decoration-2 hover:underline"
          onClick={handleOnClick}
        >
          <Shuffle className="h-4 w-4" /> Randomize
        </button>
      </div>
      <FormControl>
        <div className="flex">
          <div className="flex items-center rounded-l-md bg-accent p-2 text-sm font-semibold text-accent-foreground">
            Waitify.com
          </div>
          <Input
            className="rounded-l-none"
            placeholder="my_waitlist"
            {...field}
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
