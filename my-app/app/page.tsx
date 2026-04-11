import Image from "next/image";
import Link from "next/link";
import TodayEvents from "@/components/calender/TodayEvents"

export default function Home() {
  return (
    <div className="w-full max-w-8xl mx-auto pt-30 px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        {/* MT */}
        <div className="w-full max-w-sm mx-auto">
          <TodayEvents
            query="MT"
            title="MT idag"
            titleClassName="text-orange-200"
          />
        </div>

        {/* CENTER */}
        <div className="flex items-center justify-center text-white text-5xl font-semibold">
          <Image
            src="/logo2.gif"
            alt="Homepage symbol"
            width={600}
            height={600}
            className="w-[700px] h-[400px] object-contain"
            unoptimized
          />
        </div>

        {/* GDK */}
        <div className="w-full max-w-sm mx-auto">
          <TodayEvents
            query="GDK"
            title="GDK idag"
            titleClassName="text-green-200"
          />
        </div>
      </div>
    </div>
  );
}
