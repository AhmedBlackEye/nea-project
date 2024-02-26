"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updatePassword } from "@/lib/server-actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";

import { Shell } from "lucide-react";
import { z } from "zod";
import { PasswordInput } from "@/components/ui/password-input";

const schema = z
  .object({
    password: z
      .string()
      .describe("password")
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().describe("Confirm Password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });
type TSchema = z.infer<typeof schema>;

function UpdatePasswordForm() {
  const form = useForm<TSchema>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirmPassword: "" },
  });
  const isLoading = form.formState.isSubmitting;
  const [submitError, setSubmitError] = useState("");

  const onSubmit: SubmitHandler<TSchema> = async (formData) => {
    const { error } = await updatePassword(formData.password);
    if (error) setSubmitError(error.message);
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          disabled={isLoading}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Repeat your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
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

export default UpdatePasswordForm;
