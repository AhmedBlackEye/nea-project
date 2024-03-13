import { LucideIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

type SidebarProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  children: ReactNode;
};

function Sidebar({ className, children, ...props }: SidebarProps) {
  return (
    <nav
      className={cn(
        "sticky top-0 hidden h-screen max-w-xs border-r border-border p-2 sm:flex sm:w-48 sm:flex-col sm:justify-between lg:w-60 xl:w-64",
        className,
      )}
      {...props}
    >
      {children}
    </nav>
  );
}

type SidebarListProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children: ReactNode;
  title?: string;
  showSeparator?: boolean;
  showTopSeparator?: boolean;
  showBottomSeparator?: boolean;
};
function SidebarList({
  children,
  title,
  showSeparator,
  showTopSeparator,
  showBottomSeparator,
  className,
  ...props
}: SidebarListProps) {
  return (
    <div className={cn("", className)} {...props}>
      {(showSeparator || showTopSeparator) && <Separator />}
      <div className="py-4">
        {title && (
          <h2 className="mb-2 text-sm font-light tracking-wider text-muted-foreground ">
            {title}
          </h2>
        )}
        <ul className="space-y-1">{children}</ul>
      </div>

      {(showSeparator || showBottomSeparator) && <Separator />}
    </div>
  );
}
type SidebarContentProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children: ReactNode;
};

function SidebarContent({ children, ...props }: SidebarContentProps) {
  return <div {...props}>{children}</div>;
}

type SidebarFooterProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children: ReactNode;
};

function SidebarFooter({ children, ...props }: SidebarFooterProps) {
  return <div {...props}>{children}</div>;
}

type SidebarItemProps = LinkProps & {
  title: string;
  Icon: LucideIcon;
  label?: string;
  isActive?: boolean;
  className?: string;
};

function SidebarItem({
  href,
  title,
  label,
  Icon,
  isActive,
  className,
  ...props
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex h-9 items-center whitespace-nowrap rounded-md px-3 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          : "hover:bg-accent hover:text-accent-foreground",
        className,
      )}
      {...props}
    >
      <div className="flex items-center">
        <Icon className="mr-2 h-5 w-5" />
        <span>{title}</span>
      </div>

      {label && (
        <span
          className={cn(
            "ml-auto ",
            isActive && "text-background dark:text-white",
          )}
        >
          {label}
        </span>
      )}
    </Link>
  );
}

export { Sidebar, SidebarItem, SidebarList, SidebarContent, SidebarFooter };
