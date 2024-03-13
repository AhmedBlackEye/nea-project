import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import ThemeToggle from "@components/shared/theme-toggle";

import { Bell } from "lucide-react";
import UserProfileDropdown from "./user-profile-dropdown";
import { Button } from "@/components/ui/button";

function AuthorizedNavbar() {
  return (
    <div className="sticky inset-x-0 top-0 flex items-center justify-between border-b-2 px-4 py-2">
      <NavBreadcrumb />

      <aside className="flex items-center gap-3">
        <ThemeToggle />
        <Button variant="outline" size="icon" className="d rounded-full">
          <Bell className="h-5 w-5" />
        </Button>
        <UserProfileDropdown />
      </aside>
    </div>
  );
}

export default AuthorizedNavbar;

function NavBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
