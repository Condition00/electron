"use client";


import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


function Navbar() {
  return (
    <div className="flex min-w-screen items-center justify-center text-black">
    <NavigationMenu className="fixed top-2 z-5 flex items-center min-w-fit bg-white border-0 rounded-xl px-4 py-1 font-opensans font-light">
        <NavigationMenuList className="relative flex gap-3">
            <NavigationMenuItem>
                <NavigationMenuLink href="/">
                    Home
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink href="/collection/all" >
                    Collections
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink href="/support">
                    Support
                </NavigationMenuLink>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
    </div>
  );
};

export default Navbar;

