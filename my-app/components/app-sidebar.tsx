import { Calendar, Home, Search, Settings } from "lucide-react"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Hem",
    url: "/",
    icon: Home,
  },
  {
    title: "Kalender",
    url: "/kalender",
    icon: Calendar,
  },
  {
    title: "Idolkort",
    url: "/idolkort",
    icon: Search,
  },
  {
    title: "Phadderistspelet",
    url: "/phadderistspelet",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-none">
      <SidebarContent >
        <SidebarGroup>
          <SidebarGroupLabel className="mb-4 text-white rounded-md"></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton asChild className="bg-gray-200 hover:bg-red-700 hover:text-white">
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}