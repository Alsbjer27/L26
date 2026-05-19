"use client"

import "./globals.css"
import DarkVeilBackground from "@/components/reactbits/DarkVeilBackground"
import localFont from "next/font/local"

const trattatello = localFont({
  src: "./fonts/Trattatello/Trattatello/Trattatello.ttf",
  display: "swap",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <title>Legionen</title>

      <body className="w-full min-h-screen">
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <DarkVeilBackground />
        </div>

        <main className="relative z-10 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}