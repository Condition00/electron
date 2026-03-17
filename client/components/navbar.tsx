"use client";

import * as React from "react";
import { useEffect, useState } from "react";
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
import SearchBar from "@/components/SearchBar";

function Navbar() {
  const { count } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsAuthenticated(Boolean(getAuthToken()));
  }, []);

  const profileHref = isMounted && isAuthenticated ? "/account" : "/login";

  return (
    <div className="sticky flex min-w-screen items-center justify-center z-100 text-black">
      <NavigationMenu className="fixed left-10 top-2 z-5 flex items-center min-w-fit bg-white border-0 rounded-xl px-4 py-1 font-opensans font-light">
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

      <div className="fixed top-2 left-1/2 -translate-x-1/2 z-5 w-72 md:w-96">
        <SearchBar />
      </div>
      <NavigationMenu className="fixed right-10 top-2 z-5 flex items-center min-w-fit bg-white border-0 rounded-xl px-4 py-1 font-opensans font-light">
        <NavigationMenuList className="relative flex gap-3">
          <NavigationMenuItem>
            <NavigationMenuLink href={profileHref}>
              <CircleUser />
            </NavigationMenuLink>
          </NavigationMenuItem>
          {isMounted && isAuthenticated ? (
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
          ) : null}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default Navbar;
