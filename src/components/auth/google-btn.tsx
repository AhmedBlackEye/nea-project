"use client";
import React from "react";
import { Button } from "../ui/button";
import Google from "../icons/google";
import { signWithGoogle } from "@/lib/server-actions/auth";
// import { useRouter } from "next/navigation";

type Props = {
  type: "Sign in" | "Sign up";
};

function GoogleSignBtn({ type }: Props) {
  //   const router = useRouter();
  async function handleOnClick() {
    console.log("handle sign");
    const response = await signWithGoogle();
    console.log(response);
    // if (error) router.replace("/error");
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

export default GoogleSignBtn;
