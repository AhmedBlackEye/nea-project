"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ForgotPasswordForm from "./form";
import { useState } from "react";

function ResetPasswordPage() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  return (
    <Card className="p-4">
      <CardHeader className="text-center">
        <CardTitle>Reset password</CardTitle>
        <CardDescription>
          {"Remember your password?"}
          <Link
            href="/login"
            className="ml-1 font-semibold text-primary decoration-2 hover:underline"
          >
            Sign in
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isFormSubmitted ? (
          <div className="text-center text-lg font-medium">
            Check your emails
          </div>
        ) : (
          <ForgotPasswordForm setIsFormSubmitted={setIsFormSubmitted} />
        )}
      </CardContent>
    </Card>
  );
}

export default ResetPasswordPage;
