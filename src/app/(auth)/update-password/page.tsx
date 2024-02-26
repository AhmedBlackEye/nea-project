import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import UpdatePasswordForm from "./form";

function UpdatePasswordPage() {
  return (
    <Card className="p-4">
      <CardHeader className="text-center">
        <CardTitle>Update your password</CardTitle>
        <CardDescription>
          Remember your password?
          <Link
            href="/sign-in"
            className="ml-1 font-semibold text-primary decoration-2 hover:underline"
          >
            Sign in
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UpdatePasswordForm />
      </CardContent>
    </Card>
  );
}

export default UpdatePasswordPage;
