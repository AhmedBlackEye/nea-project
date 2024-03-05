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

import { Separator } from "@components/ui/separator";

import Logo from "../logo";
import SidebarItem from "./sidebarItem";

type SidebarLink = {
  title: string;
  label?: string;
  Icon: LucideIcon;
  href: string;
};

type SidebarProps = {
  itemsStart: (SidebarLink[] | null)[];
  itemsEnd?: (SidebarLink[] | null)[];
};

function Sidebar({ itemsStart, itemsEnd }: SidebarProps) {
  return (
    <nav className="fixed h-screen max-w-xs border-r border-border p-2">
      <div className="flex gap-2">
        <Logo size="large" link="" />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          {itemsStart.map((items, index) => (
            {items !== null ? <Nav items={items}/>:<Nav items={items}/>}
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;

function Nav(items: SidebarLink[]) {
  return (
    <ul className="grid gap-1 px-2">
      {items.map((item, index) => (
        <SidebarItem key={index} {...item} />
      ))}
    </ul>
  );
}
