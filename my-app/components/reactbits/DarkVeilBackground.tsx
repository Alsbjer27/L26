"use client";

import DarkVeil from "./DarkVeil"; // <-- adjust to the package's actual import path

type Props = {
  className?: string;
};

export default function DarkVeilBackground({ className }: Props) {
  return (
    <div className={`absolute inset-0 ${className ?? ""}`} aria-hidden="true">
      <DarkVeil
        hueShift={230}
        noiseIntensity={0.05}
        scanlineIntensity={0}
        speed={1.8}
        scanlineFrequency={3.2}
        warpAmount={2.8}
      />
    </div>
  );
}
