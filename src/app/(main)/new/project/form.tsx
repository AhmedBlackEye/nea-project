"use client";

import { SubmitHandler, useForm } from "react-hook-form";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { zodResolver } from "@hookform/resolvers/zod";

import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { serverLog } from "@/lib/actions/auth";
import {
  checkIfCampaignSlugExists,
  createNewCampaign,
} from "@/lib/queries/campaign";
import { Info, Shell, Shuffle } from "lucide-react";
import { nanoid } from "nanoid";
import { use, useEffect, useState } from "react";
import { TNewProjectSchema, newProjectSchema } from "./schema";
import { useRouter } from "next/navigation";

type NewWorkspaceFormProps = {
  workspaceData: {
    label: string;
    value: string;
  }[];
};
function NewCampaignForm({ workspaceData }: NewWorkspaceFormProps) {
  const router = useRouter();
  const form = useForm<TNewProjectSchema>({
    resolver: zodResolver(newProjectSchema),
    defaultValues: {
      workspaceId: "",
      name: "",
      slug: "",
      description: "",
      customURL: "",
      startAt: new Date(),
      endsAt: undefined,
    },
  });
  const isLoading = form.formState.isSubmitting;
  const [submitError, setSubmitError] = useState("");
  const [isGeneratingSlugLoading, setIsGeneratingSlugLoading] = useState(false);
  const onSubmit: SubmitHandler<TNewProjectSchema> = async (formData) => {
    const { error } = await createNewCampaign({
      ...formData,
      startsAt: formData.startAt?.toISOString(), // Convert startAt Date to string
      endsAt: formData.endsAt?.toISOString(), // Convert endsAt Date to string
    });
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please try again or contact us if the issue presists.",
      });
    } else {
      router.replace("/projects");
      toast({
        title: "Waitlist created successfully",
      });
    }
  };
  async function handleGenerateSlug(e: any) {
    setIsGeneratingSlugLoading(true);
    e.preventDefault();
    let slugId = "";
    let doesSlugExist = true;
    while (doesSlugExist) {
      slugId = nanoid(11);
      doesSlugExist = await checkIfCampaignSlugExists(slugId);
    }
    form.setValue("slug", slugId);
    setIsGeneratingSlugLoading(false);
  }

  const slugInput = form.watch("slug");
  useEffect(() => {
    console.log(slugInput);
    const handleCheckIfSlugExists = async () => {
      form.clearErrors("slug");
      const doesSlugExist: boolean = await checkIfCampaignSlugExists(slugInput);
      if (doesSlugExist) {
        form.setError("slug", {
          message: "Slug already exists please choose another one",
        });
      }
    };
    handleCheckIfSlugExists();
  }, [slugInput]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onChange={() => {
          if (submitError) setSubmitError("");
        }}
        className="flex w-full flex-col space-y-4"
      >
        <FormField
          control={form.control}
          disabled={isLoading}
          name="workspaceId"
          render={({ field }) => (
            <FormItem>
              <CustomLabel
                label="Workspace Name"
                tooltipDescription="Your project will live in here"
              />
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a workspace" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {workspaceData.map(({ label, value }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          disabled={isLoading}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="my waitlist" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          disabled={isLoading}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center  justify-between ">
                <CustomLabel
                  label="Waitlist Slug"
                  tooltipDescription="The ID of your waitlist e.g. Waitify.com/waitlist/my_waitlist"
                />
                <button
                  className="flex items-center gap-1 text-sm text-primary decoration-2 hover:underline"
                  onClick={async (e) => await handleGenerateSlug(e)}
                >
                  {isGeneratingSlugLoading ? (
                    <>
                      <Shell className="h-4 w-4 animate-spin" /> Generating
                    </>
                  ) : (
                    <>
                      <Shuffle className="h-4 w-4" /> Randomize
                    </>
                  )}
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
          )}
        />
        <FormField
          control={form.control}
          disabled={isLoading}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your waitlist..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Accordion type="multiple">
          <AccordionItem value="custom-domain" className="border-none">
            <AccordionTrigger>Advanced Options</AccordionTrigger>
            <AccordionContent className="space-y-4 px-2">
              <FormField
                control={form.control}
                disabled={isLoading}
                name="customURL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custom domain</FormLabel>
                    <FormControl>
                      <Input placeholder="mywebsite.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-4 md:flex-row">
                <FormField
                  control={form.control}
                  disabled={isLoading}
                  name="startAt"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          date={field.value}
                          setDate={field.onChange}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  disabled={isLoading}
                  name="endsAt"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          date={field.value}
                          setDate={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {submitError && <FormMessage>{submitError}</FormMessage>}
        <Button type="submit" className="float-end">
          {isLoading ? <Shell className="mr-2 animate-spin" /> : "Create"}
        </Button>
      </form>
    </Form>
  );
}

export default NewCampaignForm;

function CustomLabel({
  label,
  tooltipDescription,
}: {
  tooltipDescription: string;
  label: string;
}) {
  return (
    <FormLabel className="flex items-center gap-1">
      {label}
      <Tooltip>
        <TooltipTrigger>
          <Info className="h-4 w-4 stroke-muted-foreground" />
        </TooltipTrigger>
        <TooltipContent>{tooltipDescription}</TooltipContent>
      </Tooltip>
    </FormLabel>
  );
}
