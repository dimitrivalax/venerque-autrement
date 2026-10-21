"use client";

import type { ReactNode } from "react";

import { ChevronRightIcon, CircleSmallIcon } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { NavigationSection } from "@/lib/types/navigation";
import { isNavigationHrefActive } from "@/lib/is-navigation-href-active";
import { cn } from "@/lib/utils";

export type { NavigationItem, NavigationSection } from "@/lib/types/navigation";

type Props = {
  trigger: ReactNode;
  navigationData: NavigationSection[];
  align?: "center" | "end" | "start";
};

/**
 * Mobile navigation dropdown with pathname-based active highlighting.
 *
 * @param trigger - Element that opens the dropdown
 * @param navigationData - Primary navigation sections
 * @param align - Dropdown alignment relative to the trigger
 */
const MenuDropdown = ({ trigger, navigationData, align = "start" }: Props) => {
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="mx-3 w-[min(93vw,500px)] sm:ml-8 md:w-[min(93vw,250px)] max-lg:md:mr-0"
        align={align}
      >
        {navigationData.map((navItem) => {
          if (navItem.href) {
            const isActive = isNavigationHrefActive(navItem.href, pathname);

            return (
              <DropdownMenuItem key={navItem.title} asChild>
                <Link
                  href={navItem.href}
                  className={cn(
                    isActive && "bg-accent text-accent-foreground font-medium",
                  )}
                >
                  {navItem.icon}
                  {navItem.title}
                </Link>
              </DropdownMenuItem>
            );
          }

          return (
            <Collapsible key={navItem.title} asChild>
              <DropdownMenuGroup>
                <CollapsibleTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(event) => event.preventDefault()}
                    className="justify-between"
                  >
                    {navItem.icon}
                    <span className="flex-1">{navItem.title}</span>
                    <ChevronRightIcon className="shrink-0 transition-transform in-data-[state=open]:rotate-90" />
                  </DropdownMenuItem>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-2">
                  {navItem.items?.map((item) => (
                    <DropdownMenuItem key={item.title} asChild>
                      <Link href={item.href}>
                        <CircleSmallIcon />
                        <span>{item.title}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </CollapsibleContent>
              </DropdownMenuGroup>
            </Collapsible>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuDropdown;
