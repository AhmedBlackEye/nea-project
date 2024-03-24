import { getWorkspaces } from "@/lib/queries/workspaces";
import {
  ArrowUpRight,
  FileText,
  LayoutPanelLeft,
  Settings,
} from "lucide-react";

export const sidebarData = [
  {
    hasTopBorder: false,
    hasBottomBorder: true,
    title: "All projects",
    items: [
      {
        href: "/project/something",
        title: "Waitify",
        label: "",
        Icon: ArrowUpRight,
      },
      {
        href: "/project/something",
        title: "Dub",
        label: "",
        Icon: ArrowUpRight,
      },
    ],
  },
  {
    hasTopBorder: true,
    hasBottomBorder: false,
    title: "Workspaces",
    items: [
      {
        href: "/project/something",
        title: "LAET",
        label: "",
        Icon: ArrowUpRight,
      },
      {
        href: "/project/something",
        title: "Woodhouse",
        label: "",
        Icon: ArrowUpRight,
      },
    ],
  },
];

export const sidebarFooter = [
  {
    href: "/templates",
    title: "Templates",
    label: "",
    Icon: LayoutPanelLeft,
  },
  {
    href: "/docs",
    title: "Docs",
    label: "",
    Icon: FileText,
  },
  {
    href: "/settings",
    title: "Settings",
    label: "",
    Icon: Settings,
  },
];
