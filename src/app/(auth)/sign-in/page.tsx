import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import LoginForm from "./form";
import GoogleOAuthBtn from "@/components/auth/google-oauth-btn";

function LoginPage() {
  return (
    <Card className="p-4">
      <CardHeader className="text-center">
        <CardTitle>Sign in to Waitify</CardTitle>
        <CardDescription>
          {"Don't have an account yet?"}
          <Link
            href="/sign-up"
            className="ml-1 font-semibold text-primary decoration-2 hover:underline"
          >
            Sign up
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GoogleOAuthBtn type="Sign in" />
        <div className="my-4 flex w-full items-center justify-center gap-2">
          <Separator className="shrink" />
          <span className="w-full text-center text-sm font-medium text-muted-foreground">
            Or continue with
          </span>
          <Separator className="shrink" />
        </div>
        <LoginForm />
      </CardContent>
    </Card>
  );
}

export default LoginPage;
