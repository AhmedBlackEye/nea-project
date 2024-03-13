import React from "react";
import { Button, buttonVariants } from "../../ui/button";
import { ArrowBigUpDash } from "lucide-react";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

type UpgradeSubscriptionBtnProps = VariantProps<typeof buttonVariants> & {
  className?: string;
};

function UpgradeSubscriptionBtn({
  size,
  className,
  ...props
}: UpgradeSubscriptionBtnProps) {
  return (
    <Button
      size={size || "lg"}
      className={cn(
        "group mb-2 w-full animate-shimmer border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] font-semibold text-white transition-colors dark:text-slate-400",
        className,
      )}
      {...props}
    >
      <ArrowBigUpDash className="mr-2 h-7 w-7 group-hover:animate-bounce" />
      Upgrade To Pro
    </Button>
  );
}

export default UpgradeSubscriptionBtn;
