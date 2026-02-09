"use client"
import "./globals.css"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { NavigationMenuDemo } from "@/components/navigation-menu"
import DarkVeilBackground from "@/components/reactbits/DarkVeilBackground";
import ShinyText from "@/components/reactbits/ShinyText"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      
      <title>Legionen</title>
      <body className="w-full min-h-screen">
       <div className="fixed inset-0 -z-10 pointer-events-none">
          <DarkVeilBackground />
        </div>
        <header className="sticky top-0 z-50 w-full">
          <div className=" text-white text-6xl mx-auto flex w-full max-w-9xl justify-center px-4 py-7">
            <ShinyText
              text="LEGIONEN"
              speed={2}
              delay={0}
              color="#b5b5b5"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
              disabled={false}
            />
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