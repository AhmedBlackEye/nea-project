"use client";

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
import { loginUser } from "@/lib/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, TLoginSchema } from "./schema";
import Link from "next/link";
import { Shell } from "lucide-react";
import { useLocalStorage } from "@/hooks";
import { useState } from "react";

function LoginForm() {
  const [savedEmail, setSavedEmail] = useLocalStorage("Auth_Email", "");
  const [savedPassword, setSavedPassword] = useLocalStorage(
    "Auth_Password",
    "",
  );
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: savedEmail,
      password: savedPassword,
      rememberMe: false,
    },
  });
  const isLoading = form.formState.isSubmitting;
  const [submitError, setSubmitError] = useState("");
  const onSubmit: SubmitHandler<TLoginSchema> = async (formData) => {
    const { error } = await loginUser(formData);
    if (error) {
      setSubmitError(error.message);
    } else {
      if (formData.rememberMe) {
        setSavedEmail(formData.email);
        setSavedPassword(formData.password);
      }
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
              <div className="flex items-center  justify-between ">
                <FormLabel>Password</FormLabel>
                <Link
                  href="/reset-password"
                  className="text-sm text-primary decoration-2 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <FormControl>
                <PasswordInput placeholder="Enter your password" {...field} />
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
          {isLoading ? <Shell className="mr-2 animate-spin" /> : "Sign in"}
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
