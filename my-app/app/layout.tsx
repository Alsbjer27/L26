"use client"
import "./globals.css"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { NavigationMenuDemo } from "@/components/navigation-menu"
import DarkVeilBackground from "@/components/reactbits/DarkVeilBackground";
import ShinyText from "@/components/reactbits/ShinyText"
import localFont from "next/font/local"
import GooeyNavUse from "@/components/reactbits/GooeyNavUse"
import LogoLoop from "@/components/LogoLoop"

const trattatello = localFont({
  src: "./fonts/Trattatello/Trattatello/Trattatello.ttf",
  display: "swap",
})

const logos = [
  { src: "/logo2.gif", alt: "Legionen", href: "/" },
  { src: "/Spons/ravencraft.png", alt: "Ravencraft", href: "https://www.korps.se/?srsltid=AfmBOoocUFPpSrufWzU8HW2sbUeJNDB0qm_pMKFBUsqvMg9ByUU5Vjyy" },
  { src: "/Spons/ica.pdf", alt: "Gru", href: "/idolkort" },
  { src: "/Spons/mera.png", alt: "MeraMärken", href: "https://www.mera.se/marken" },

]

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <title>Legionen</title>
      <body className="w-full min-h-screen">
       <div className="fixed inset-0 -z-10 pointer-events-none">
          <DarkVeilBackground />
        </div>
        <header className=" top-0 z-50 w-full">
          <div className="text-white text-6xl mx-auto flex w-full max-w-9xl justify-center px-4 py-5">
            
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-9xl justify-center px-4 py-2 ">
          <GooeyNavUse/>
        </div>
        <main>
          {children}
        </main>
        <footer className="fixed bottom-0 left-0 w-full z-50 py-4">
  <div className="mx-auto w-full max-w-9xl px-4">
    <LogoLoop
      logos={logos}
      speed={50}
      direction="left"
      logoHeight={60}
      gap={40}
      pauseOnHover
      scaleOnHover
      fadeOut
      fadeOutColor="transparent"
      ariaLabel="Legionen logos"
    />
  </div>
</footer>
      </body>
    </html>
  )
}