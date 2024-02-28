"use client";
import React from "react";
import { Button } from "../ui/button";
import Google from "../icons/google";
import { createClient } from "@/lib/supabase/client";

type Props = {
  type: "Sign in" | "Sign up";
};

function GoogleOAuthBtn({ type }: Props) {
  const supabase = createClient();
  async function handleOnClick() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }
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

export default GoogleOAuthBtn;
