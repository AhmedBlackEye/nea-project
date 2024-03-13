"use client";

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/shared/theme-toggle";
import { useUser } from "@/components/providers/supabase-user-provider";
import { Menu } from "lucide-react";

const navLinks = [
  { title: "Features", link: "#" },
  { title: "Demo", link: "#" },
  { title: "Pricing", link: "#" },
  { title: "Docs", link: "#" },
  { title: "Blog", link: "#" },
];

type Props = {
  isNavVisible?: boolean;
};

export default function UnauthorizedNavbar({ isNavVisible = true }: Props) {
  const { user } = useUser();
  return (
    <header className="sticky top-0 flex w-full justify-between border-b-2  px-8 py-2">
      <Logo />
      {isNavVisible && <NavMenu />}

      <aside className="flex items-center gap-4">
        <ThemeToggle />
        {user ? (
          <Button asChild>
            <Link href="/projects">Dashboard</Link>
          </Button>
        ) : (
          <div className="space-x-2">
            <Button variant={"outline"} asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Sign up</Link>
            </Button>
          </div>
        )}
        <Menu className="lg:hidden" />
      </aside>
    </header>
  );
}

function NavMenu() {
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        {navLinks.map((navItem) => (
          <NavigationMenuItem key={navItem.title}>
            <Link href={navItem.link} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {navItem.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
