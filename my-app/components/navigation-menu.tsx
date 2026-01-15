"use client"

import * as React from "react"
import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export function NavigationMenuDemo() {
  const isMobile = useIsMobile()

 return (
  <NavigationMenu viewport={isMobile}>
    <NavigationMenuList className="flex-wrap">
      {/* Direct link */}
      <NavigationMenuItem className="bg-black text-white hover:text-gray-300">
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <Link href="/">Hem</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>

      {/* Dropdown: Kalender */}
      <NavigationMenuItem className="bg-black text-white hover:text-gray-300">
        <NavigationMenuTrigger className="hover:cursor-pointer">Kalender</NavigationMenuTrigger>
        <NavigationMenuContent className="mt-10">
          <div className="grid gap-2 p-4 md:w-[280px]">
            <NavigationMenuLink asChild>
              <Link
                href="/kalender"
                className="rounded-md p-2 hover:border-indigo-500 hover:bg-gray-200 hover:text-accent-foreground text-black"
              >
                Grafiskdesign & Kommunikation
              </Link>
            </NavigationMenuLink>

            <NavigationMenuLink asChild>
              <Link
                href="/kalender/veckan"
                className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground text-black"
              >
                Medieteknik & AI
              </Link>
            </NavigationMenuLink>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>

      {/* Direct link */}
      <NavigationMenuItem className="bg-black text-white hover:text-gray-300">
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <Link href="/idolkort">Idolkort</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>

      {/* Direct link */}
      <NavigationMenuItem className="bg-black text-white hover:text-gray-300">
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <Link href="/phadderistspelet">Phadderistspelet</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>

      {/* Dropdown: Nolleboken */}
      <NavigationMenuItem className="bg-black text-white hover:text-gray-300">
        <NavigationMenuTrigger className="hover:cursor-pointer">Nolleboken</NavigationMenuTrigger>
        <NavigationMenuContent>
          <div className="grid gap-2 p-4 md:w-[280px]">
            <NavigationMenuLink asChild>
              <Link
                href="/nolleboken"
                className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
              >
                Grafiskdesign & Kommunikation
              </Link>
            </NavigationMenuLink>

            <NavigationMenuLink asChild>
              <Link
                href="/nolleboken/regler"
                className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
              >
                Medieteknik & AI
              </Link>
            </NavigationMenuLink>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
)
}