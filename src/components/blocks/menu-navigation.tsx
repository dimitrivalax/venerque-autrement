"use client";

import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import type { NavigationSection } from "@/lib/types/navigation";
import { isNavigationHrefActive } from "@/lib/is-navigation-href-active";
import { cn } from "@/lib/utils";

export type { NavigationItem, NavigationSection } from "@/lib/types/navigation";

type MenuNavigationProps = {
  navigationData: NavigationSection[];
  className?: string;
};

/**
 * Desktop navigation menu with pathname-based active highlighting.
 *
 * @param navigationData - Primary navigation sections
 * @param className - Optional extra class names for the menu root
 */
const MenuNavigation = ({ navigationData, className }: MenuNavigationProps) => {
  const pathname = usePathname();

  return (
    <NavigationMenu viewport={false} className={className}>
      <NavigationMenuList className="flex-wrap justify-start gap-3">
        {navigationData.map((navItem) => {
          if (navItem.href) {
            const isActive = isNavigationHrefActive(navItem.href, pathname);

            return (
              <NavigationMenuItem key={navItem.title}>
                <NavigationMenuLink
                  href={navItem.href}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "hover:text-primary dark:hover:bg-accent/50 bg-transparent px-3 py-2 text-sm font-medium tracking-tight!",
                    isActive
                      ? "text-primary bg-accent/60 font-semibold"
                      : "text-muted-foreground",
                  )}
                >
                  {navItem.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }

          // Section with dropdown
          return (
            <NavigationMenuItem key={navItem.title}>
              <NavigationMenuTrigger className="dark:data-[state=open]:hover:bg-accent/50 text-muted-foreground hover:text-primary dark:hover:bg-accent/50 bg-transparent px-3 py-1.5 text-base [&>svg]:size-4">
                {navItem.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="data-[motion=from-start]:slide-in-from-left-30! data-[motion=to-start]:slide-out-to-left-30! data-[motion=from-end]:slide-in-from-right-30! data-[motion=to-end]:slide-out-to-right-30! absolute w-auto">
                <ul className="grid w-38 gap-4">
                  <li>
                    {navItem.items?.map((item) => (
                      <NavigationMenuLink key={item.title} href={item.href}>
                        {item.title}
                      </NavigationMenuLink>
                    ))}
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MenuNavigation;
