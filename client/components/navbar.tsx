"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { CircleUser, ShoppingCart } from "lucide-react";

function Navbar() {
  return (
    <div className="sticky flex min-w-screen items-center justify-center z-100 text-black">
      <NavigationMenu className="fixed top-2 z-5 flex items-center min-w-fit bg-white border-0 rounded-xl px-4 py-1 font-opensans font-light">
        <NavigationMenuList className="relative flex gap-3">
          <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/collection/all">
              Collections
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/support">Support</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu className="fixed right-10 top-2 z-5 flex items-center min-w-fit bg-white border-0 rounded-xl px-4 py-1 font-opensans font-light">
        <NavigationMenuList className="relative flex gap-3">
          <NavigationMenuItem>
            <NavigationMenuLink href="/account">
              <CircleUser />
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/cart">
              <ShoppingCart />
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default Navbar;
