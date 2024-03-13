"use client";

import { Button } from "@components/ui/button";
import Google from "@components/icons/google";
import { createClient } from "@/lib/supabase/client";
import { signWithGoogle } from "@/lib/actions/auth";

type Props = {
  type: "Sign in" | "Sign up";
};

export default function GoogleOAuthBtn({ type }: Props) {
  return (
    <Button
      variant={"outline"}
      className="w-full"
      size={"lg"}
      onClick={handleOnClick}
    >
      <Google size={32} className="mr-2" />
      <span className="font-medium text-muted-foreground">
        {type} with Google
      </span>
    </Button>
  );
}

async function handleOnClick() {
  const supabase = await createClient();
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: `http://${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/auth/callback`,
    },
  });
}
