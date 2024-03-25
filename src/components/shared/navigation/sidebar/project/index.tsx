"use client";

import UpgradeSubscriptionBtn from "@/components/shared/buttons/upgrade-subscription";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarItem,
  SidebarList,
} from "../";
import { getSidebarData, getSidebarFooter } from "./sidebar-data";

function ProjectSidebar() {
  const url = usePathname();
  const projectId = url.split("/")[2];
  return (
    <Sidebar>
      <SidebarContent>
        {getSidebarData(projectId).map((itemsList, index) => (
          <SidebarList
            key={`sidebar-list-${itemsList.title}-${index}}`}
            showTopSeparator={itemsList.hasTopBorder}
            showBottomSeparator={itemsList.hasBottomBorder}
            title={itemsList.title}
          >
            {itemsList.items.map((item, index) => (
              <SidebarItem
                key={`sidebar-item-${item.title}-${index}`}
                title={item.title}
                href={item.href}
                label={item.label}
                Icon={item.Icon}
                isActive={item.href === url}
              />
            ))}
          </SidebarList>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <UpgradeSubscriptionBtn />
        <SidebarList showTopSeparator>
          {getSidebarFooter().map((item) => (
            <SidebarItem
              key={item.title}
              title={item.title}
              href={item.href}
              label={item.label}
              Icon={item.Icon}
              isActive={item.href === url}
            />
          ))}
        </SidebarList>
      </SidebarFooter>
    </Sidebar>
  );
}

export default ProjectSidebar;
