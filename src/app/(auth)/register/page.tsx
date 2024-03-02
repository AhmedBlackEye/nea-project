import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import SignUpForm from "./form";
import GoogleOAuthBtn from "@/components/auth/google-oauth-btn";

function SignUpPage() {
  return (
    <Card className="p-4">
      <CardHeader className="text-center">
        <CardTitle>Sign up to Waitlytics</CardTitle>
        <CardDescription>
          Already have an account?
          <Link
            href="/login"
            className="ml-1 font-semibold text-primary decoration-2 hover:underline"
          >
            Sign in
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GoogleOAuthBtn type="Sign up" />
        <div className="my-4 flex w-full items-center justify-center gap-2">
          <Separator className="shrink" />
          <span className="w-full text-center text-sm font-medium text-muted-foreground">
            Or continue with
          </span>
          <Separator className="shrink" />
        </div>
        <SignUpForm />
      </CardContent>
    </Card>
  );
}

export default SignUpPage;
