import { getWorkspaces } from "@/lib/queries/workspaces";
import {
  FileText,
  Home,
  LayoutPanelLeft,
  Settings,
  Settings2,
  Table,
} from "lucide-react";

export function getSidebarData(id: string) {
  return [
    {
      hasTopBorder: false,
      hasBottomBorder: false,
      title: "All projects",
      items: [
        {
          href: `/project/${id}/`,
          title: "Home",
          label: "",
          Icon: Home,
        },
        {
          href: `/project/${id}/submissions`,
          title: "Submissions",
          label: "",
          Icon: Table,
        },
        {
          href: `/project/${id}/Waitlists`,
          title: "Waitlists",
          label: "",
          Icon: Table,
        },
        {
          href: `/project/${id}/settings`,
          title: "Settings",
          label: "",
          Icon: Settings2,
        },
      ],
    },
  ];
}

export function getSidebarFooter() {
  return [
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
}
