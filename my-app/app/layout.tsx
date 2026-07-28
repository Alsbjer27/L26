"use client"
import "./globals.css"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { NavigationMenuDemo } from "@/components/navigation-menu"
import { usePathname } from "next/navigation"
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
  { src: "/Spons/RavenCraftBakgrund.png", alt: "Ravencraft", href: "https://www.korps.se/?srsltid=AfmBOoocUFPpSrufWzU8HW2sbUeJNDB0qm_pMKFBUsqvMg9ByUU5Vjyy" },
  { src: "/Spons/ica.png", alt: "Ica Strömmen", href: "https://www.ica.se/butiker/nara/norrkoping/ica-nara-strommen-norrkoping-1004556/?icqid=Cj0KCQjwlLDQBhDjARIsAPlIefHt4cMgDIcdg8WCXNN448VI2aGUuBCUJTIqcktMfcr9ASLGPOiJwdoaAjKEEALw_wcB&gad_source=1&gad_campaignid=18725114863&gbraid=0AAAAADKgUie6NGu5wVBJqMUSepQVwnLYc&gclid=Cj0KCQjwlLDQBhDjARIsAPlIefHt4cMgDIcdg8WCXNN448VI2aGUuBCUJTIqcktMfcr9ASLGPOiJwdoaAjKEEALw_wcB" },
  { src: "/Spons/mera.png", alt: "MeraMärken", href: "https://www.mera.se/marken" },

]


export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  const hideLogoLoop =
  pathname === "/kalender" ||
  pathname === "/idolkort"
  return (
    <html lang="en">
      <title>Legionen</title>
      <body className="flex min-h-screen w-full flex-col">
       <div className="fixed inset-0 -z-10 pointer-events-none">
          <DarkVeilBackground />
        </div>
        <div className="relative z-50 mx-auto flex w-full max-w-[1440px] justify-center px-4 py-3 sm:py-5">
          <GooeyNavUse/>
        </div>
        <main className="flex-1">
          {children}
        </main>
{!hideLogoLoop && (
  <footer className="relative z-10 w-full border-t border-white/10 bg-black/20 py-5 sm:py-6">
    <div className="mx-auto w-full max-w-[1440px] px-4">
      <LogoLoop
        logos={logos}
        speed={50}
        direction="left"
        logoHeight={44}
        gap={40}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="transparent"
        ariaLabel="Legionen logos"
      />
    </div>
  </footer>
)}
      </body>
    </html>
  )
}
