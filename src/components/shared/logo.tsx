import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Rocket } from "lucide-react";
import Link from "next/link";

const logoIconVariants = cva("", {
  variants: {
    size: {
      small: "h-4 w-4",
      medium: "h-6 w-6",
      large: "h-8 w-8",
    },
    color: {
      primary: "stroke-primary",
      secondary: "stroke-secondary",
    },
  },
  defaultVariants: {
    size: "medium",
    color: "primary",
  },
});

const logoTextVariants = cva("text-xl font-semibold tracking-wide", {
  variants: {
    size: {
      small: "text-sm",
      medium: "text-xl",
      large: "text-2xl",
    },
    color: {
      primary: "text-primary",
      secondary: "text-secondary",
    },
    textVisibilty: {
      visible: "visible",
      hidden: "hidden",
    },
  },
  defaultVariants: {
    size: "medium",
    color: "primary",
    textVisibilty: "visible",
  },
});

type LogoProps = VariantProps<typeof logoIconVariants> &
  VariantProps<typeof logoTextVariants> & {
    link?: string;
    iconClassName?: string;
    textClassName?: string;
  };

export default function Logo({
  iconClassName,
  textClassName,
  textVisibilty,
  size,
  color,
  link = "/",
}: LogoProps) {
  return (
    <Link className="mx-auto flex items-center gap-2" href={link}>
      <Rocket
        size={32}
        className={cn(logoIconVariants({ size, color }), iconClassName)}
      />
      <span
        className={cn(
          logoTextVariants({
            size,
            color,
            textVisibilty,
          }),
          textClassName,
        )}
      >
        Waitlytics
      </span>
    </Link>
  );
}
