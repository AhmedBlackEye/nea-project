"use client";

import { useState, Dispatch, SetStateAction } from "react";
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
import { resetPassword } from "@/lib/server-actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";

import { Shell } from "lucide-react";
import { z } from "zod";
import { useLocalStorage } from "@/hooks";

const schema = z.object({
  email: z.string().min(1, "Email is required").email(),
});
type TSchema = z.infer<typeof schema>;

type Props = {
  setIsFormSubmitted: Dispatch<SetStateAction<boolean>>;
};
function ForgotPasswordForm({ setIsFormSubmitted }: Props) {
  const [submitError, setSubmitError] = useState("");
  const [savedEmail] = useLocalStorage("Auth_Email", "");
  const form = useForm<TSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: savedEmail,
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<TSchema> = async (formData) => {
    const { error } = await resetPassword(formData.email);
    error ? setSubmitError(error.message) : setIsFormSubmitted(true);
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

        {submitError && <FormMessage>{submitError}</FormMessage>}
        <Button type="submit">
          {isLoading ? <Shell className="mr-2 animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}

export default ForgotPasswordForm;
