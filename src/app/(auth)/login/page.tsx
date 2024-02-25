"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { loginSchema, TLoginSchema } from "./schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Google from "@/components/icons/google";
import { PasswordInput } from "@/components/ui/password-input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { loginUser } from "@/lib/server-actions/auth";

function LoginPage() {
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const [submitError, setSubmitError] = useState("");
  const router = useRouter();
  const onSubmit: SubmitHandler<TLoginSchema> = async (formData) => {
    const { error } = await loginUser(formData);
    error ? setSubmitError(error.message) : router.replace("/dashboard");
  };

  return (
    <Card className="p-4">
      <CardHeader className="text-center">
        <CardTitle>Sign in to Waitify</CardTitle>
        <CardDescription>
          {"Don't have an account yet?"}
          <Link
            href="/sign-up"
            className="ml-1 decoration-2 hover:underline font-semibold text-primary"
          >
            Sign up
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant={"outline"} className="w-full" size={"lg"} asChild>
          <Link href="">
            <Google size={32} className="mr-2" />
            <span className="font-medium text-muted-foreground">
              Sign in with Google
            </span>
          </Link>
        </Button>
        <div className="w-full flex items-center gap-2 justify-center my-4">
          <Separator className="shrink" />
          <span className="text-sm font-medium text-muted-foreground w-full text-center">
            Or continue with
          </span>
          <Separator className="shrink" />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onChange={() => {
              if (submitError) setSubmitError("");
            }}
            className="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col"
          >
            <FormField
              control={form.control}
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {submitError && <FormMessage>{submitError}</FormMessage>}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default LoginPage;
