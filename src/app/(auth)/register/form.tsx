"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { signUpUser } from "@/lib/server-actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";

import { signUpSchema, TSignUpSchema } from "./schema";
import { Shell } from "lucide-react";
import { useLocalStorage } from "@/hooks";

function SignUpForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");
  const [, setSavedEmail] = useLocalStorage("Auth_Email", "");
  const [, setSavedPassword] = useLocalStorage("Auth_Password", "");
  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit: SubmitHandler<TSignUpSchema> = async (formData) => {
    const { error } = await signUpUser(formData);
    if (error) {
      setSubmitError(error.message);
    } else {
      if (formData.rememberMe) {
        setSavedEmail(formData.email);
        setSavedPassword(formData.password);
      }
      router.replace("/dashboard");
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="name@company.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="rememberMe"
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
          {isLoading ? <Shell className="mr-2 animate-spin" /> : "Sign up"}
        </Button>
      </form>
    </Form>
  );
}

export default SignUpForm;
