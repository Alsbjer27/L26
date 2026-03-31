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
        noiseIntensity={0}
        scanlineIntensity={0}
        speed={1.0}
        scanlineFrequency={0}
        warpAmount={4}
      />
    </div>
  );
}
