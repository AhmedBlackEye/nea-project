"use client";

import { signWithGoogle } from "@/lib/actions/auth";
import { Button } from "@components/ui/button";
import Google from "@components/icons/google";

type Props = {
  type: "Sign in" | "Sign up";
};

function GoogleOAuthBtn({ type }: Props) {
  async function handleOnClick() {
    await signWithGoogle();
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
