"use client"

import GooeyNav from "@/components/reactbits/GooeyNav"

const items = [
  { label: "Hem", href: "/" },
  { label: "Kalender", href: "/kalender" },
  { label: "Idolkort", href: "/idolkort" },
  // { label: "Phadderistspelet", href: "/phadderistspelet" },
  { label: "Nolleboken", href: "/nolleboken" },
]

export default function GooeyNavUse() {
  return (
    <div className="relative">
      <GooeyNav
        items={items}
        particleCount={15}
        particleDistances={[90, 10]}
        particleR={100}
        animationTime={400}
        timeVariance={300}
        colors={[6, 2, 3, 1, 2, 3, 1, 4]}
      />
    </div>
  )
}