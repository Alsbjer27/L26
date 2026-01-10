"use client"
import "./globals.css"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { NavigationMenuDemo } from "@/components/navigation-menu"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <title>Legionen</title>
      <body className="w-full min-h-screen">
        <header className="sticky top-0 z-50 w-full">
          <div className="mx-auto flex w-full max-w-6xl justify-center px-4 py-3">
            <NavigationMenuDemo />
          </div>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}