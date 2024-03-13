"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarItem,
  SidebarList,
} from "@/components/shared/navigation/sidebar";
import { usePathname } from "next/navigation";
import { sidebarData, sidebarFooter } from "./sidebar-constants";
import Logo from "@/components/shared/logo";
import AuthorizedNavbar from "@/components/shared/navigation/authorized-navbar";
import UpgradeSubscriptionBtn from "@/components/shared/buttons/upgrade-subscription";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  const url = usePathname();
  return (
    <div className="flex">
      <Sidebar>
        <SidebarContent>
          <Logo />
          {sidebarData.map((itemsList, index) => (
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
            {sidebarFooter.map((item) => (
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

      <div className="w-full">
        <AuthorizedNavbar />
        <div className="px-4">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
