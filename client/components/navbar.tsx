"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { CircleUser, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { getAuthToken } from "@/lib/auth";

function Navbar() {
  const { count } = useCart();
  const isAuthenticated = Boolean(getAuthToken());

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
            <NavigationMenuLink href={isAuthenticated ? "/account" : "/login"}>
              <CircleUser />
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/cart">
              <span className="relative inline-flex">
                <ShoppingCart />
                {count > 0 ? (
                  <span className="absolute -right-2 -top-2 inline-flex min-h-4 min-w-4 items-center justify-center rounded-full bg-color2 px-1 text-[10px] font-semibold text-white">
                    {count > 99 ? '99+' : count}
                  </span>
                ) : null}
              </span>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default Navbar;
