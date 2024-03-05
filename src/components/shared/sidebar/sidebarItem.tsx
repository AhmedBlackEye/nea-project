import { LucideIcon } from "lucide-react";
import Link, { LinkProps } from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@components/ui/button";
import { VariantProps } from "class-variance-authority";

type SidebarItemProps = LinkProps &
  VariantProps<typeof buttonVariants> & {
    title: string;
    label?: string;
    Icon: LucideIcon;
  };

function SidebarItem({
  href,
  title,
  label,
  Icon,
  variant,
  ...props
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: variant, size: "sm" }),
        variant === "default" &&
          "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
        "justify-start ",
      )}
      {...props}
    >
      <Icon className="mr-2 h-6 w-6" />
      {title}
      {label && (
        <span
          className={cn(
            "ml-auto",
            variant === "default" && "text-background dark:text-white",
          )}
        >
          {label}
        </span>
      )}
    </Link>
  );
}

export default SidebarItem;
