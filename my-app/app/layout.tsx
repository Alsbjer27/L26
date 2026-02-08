"use client"
import "./globals.css"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { NavigationMenuDemo } from "@/components/navigation-menu"
import DarkVeilBackground from "@/components/reactbits/DarkVeilBackground";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      
      <title>Legionen</title>
      <body className="w-full min-h-screen">
        <DarkVeilBackground />
        <header className="sticky top-0 z-50 w-full">
          <div className=" text-white text-6xl mx-auto flex w-full max-w-9xl justify-center px-4 py-7">
            LEGIONEN
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-9xl justify-center px-4 py-3 ">
            <NavigationMenuDemo />
          </div>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}