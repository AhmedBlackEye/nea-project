"use client";

import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";

import { newProjectSchema, TNewProjectSchema } from "./schema";
import Link from "next/link";
import { Info, Shell, Shuffle } from "lucide-react";
import { useLocalStorage } from "@/hooks";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { nanoid } from "nanoid";

type NewWorkspaceFormProps = {
  workspaceData: {
    label: string;
    value: string;
  }[];
};
function NewCampaignForm({ workspaceData }: NewWorkspaceFormProps) {
  console.log(workspaceData);
  const form = useForm<TNewProjectSchema>({
    resolver: zodResolver(newProjectSchema),
    defaultValues: {
      workspaceName: "",
      projectName: "",
      projectSlug: "",
      description: "",
      customDomain: "",
      startDate: new Date(),
      endDate: undefined,
    },
  });
  const isLoading = form.formState.isSubmitting;
  const [submitError, setSubmitError] = useState("");
  const onSubmit: SubmitHandler<TNewProjectSchema> = async (formData) => {
    console.log("submitted");
  };
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
          name="workspaceName"
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
          name="projectName"
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
          name="projectSlug"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center  justify-between ">
                <CustomLabel
                  label="Waitlist Slug"
                  tooltipDescription="The ID of your waitlist e.g. Waitify.com/waitlist/my_waitlist"
                />
                <button
                  className="flex items-center gap-1 text-sm text-primary decoration-2 hover:underline"
                  onClick={() => form.setValue("projectSlug", nanoid(11))}
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
                name="customDomain"
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
                  name="startDate"
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
                  name="endDate"
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
