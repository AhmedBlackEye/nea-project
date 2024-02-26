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
import { loginUser } from "@/lib/server-actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, TLoginSchema } from "./schema";
import Link from "next/link";
import { Shell } from "lucide-react";

function LoginForm() {
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: localStorage.getItem("Auth_Email") || "",
      password: localStorage.getItem("Auth_Password") || "",
      rememberMe: false,
    },
  });
  const isLoading = form.formState.isSubmitting;
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();
  const onSubmit: SubmitHandler<TLoginSchema> = async (formData) => {
    const { error } = await loginUser(formData);
    if (error) {
      setSubmitError(error.message);
    } else {
      if (formData.rememberMe) {
        localStorage.setItem("Auth_Email", formData.email);
        localStorage.setItem("Auth_Password", formData.password);
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
