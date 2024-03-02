"use client";

import * as React from "react";
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
import { ModeToggle } from "@/components/shared/mode-toggle";
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
    <header className="fixed top-0 flex w-full justify-between px-8 py-2 ">
      <Logo />
      {isNavVisible && (
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
      )}

      <aside className="flex items-center gap-4">
        <ModeToggle />
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
