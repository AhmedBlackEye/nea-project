"use client";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  ArrowLeft,
  ArrowRight,
  File,
  Inbox,
  LucideIcon,
  MessagesSquare,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react";

import { Nav } from "./nav";

import { Separator } from "@components/ui/separator";

import { useToggle } from "@/hooks";
import Logo from "../logo";

function Sidebar() {
  const [isCollapsed, toggleIsCollapsed] = useToggle(true);

  return (
    <div className="fixed h-screen max-w-xs border-r border-border p-2">
      <div className="flex gap-2">
        <Logo
          size="large"
          textVisibilty={isCollapsed ? "hidden" : "visible"}
          link=""
        />
        <button onClick={toggleIsCollapsed} className="translate-x-4">
          {isCollapsed ? <ArrowRight /> : <ArrowLeft />}
        </button>
      </div>
      <Separator />
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Inbox",
            label: "128",
            icon: Inbox,
            variant: "default",
          },
          {
            title: "Drafts",
            label: "9",
            icon: File,
            variant: "ghost",
          },
          {
            title: "Sent",
            label: "",
            icon: Send,
            variant: "ghost",
          },
          {
            title: "Junk",
            label: "23",
            icon: ArchiveX,
            variant: "ghost",
          },
          {
            title: "Trash",
            label: "",
            icon: Trash2,
            variant: "ghost",
          },
          {
            title: "Archive",
            label: "",
            icon: Archive,
            variant: "ghost",
          },
        ]}
      />
      <Separator />
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Social",
            label: "972",
            icon: Users2,
            variant: "ghost",
          },
          {
            title: "Updates",
            label: "342",
            icon: AlertCircle,
            variant: "ghost",
          },
          {
            title: "Forums",
            label: "128",
            icon: MessagesSquare,
            variant: "ghost",
          },
          {
            title: "Shopping",
            label: "8",
            icon: ShoppingCart,
            variant: "ghost",
          },
          {
            title: "Promotions",
            label: "21",
            icon: Archive,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
}

export default Sidebar;
