"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { Shell } from "lucide-react";
import { newProjectSchema, TNewProjectSchema } from "./schema";
import { nanoid } from "nanoid";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
] as const;

function NewProjectForm() {
  const form = useForm<TNewProjectSchema>({
    resolver: zodResolver(newProjectSchema),
    defaultValues: {
      orgranization: "en",
      projectName: "",
      projectSlug: "",
      emailNewSignups: true,
      startAtDate: new Date(),
      endAtDate: new Date(),
    },
  });
  const isLoading = form.formState.isSubmitting;
  const [submitError, setSubmitError] = useState("");
  const onSubmit: SubmitHandler<TNewProjectSchema> = async (formData) => {};
  const handleProjectSlugChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    if (newValue.length >= 3) {
      form.setError("projectSlug", {
        type: "custom",
        message: "Slug already taken!",
      });
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onChange={() => {
          if (submitError) setSubmitError("");
        }}
        className="flex w-full flex-col space-y-6 sm:w-[400px] sm:justify-center"
      >
        <FormField
          control={form.control}
          disabled={isLoading}
          name="orgranization"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Language</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? languages.find(
                            (language) => language.value === field.value,
                          )?.label
                        : "Select language"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search organization..." />
                    <CommandList>
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {languages.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              form.setValue("orgranization", language.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                language.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {language.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription>
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
              <FormLabel>Waitlist Name</FormLabel>
              <FormControl>
                <Input placeholder="My waitlist name..." {...field} />
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
                <FormLabel>Waitlist slug</FormLabel>
                <button
                  className="text-sm text-primary decoration-2 hover:underline"
                  onClick={() => {
                    form.setValue("projectSlug", nanoid(11), {
                      shouldValidate: false,
                    });
                  }}
                >
                  Generate a slug
                </button>
              </div>
              <FormControl>
                <Input
                  placeholder="my_waitlist"
                  {...field}
                  onChangeCapture={handleProjectSlugChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emailNewSignups"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-1.5 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-medium">Remember me</FormLabel>
            </FormItem>
          )}
        />
        {submitError && <FormMessage>{submitError}</FormMessage>}
        <Button type="submit">
          {isLoading ? <Shell className="mr-2 animate-spin" /> : "Sign in"}
        </Button>
      </form>
    </Form>
  );
}

export default NewProjectForm;
