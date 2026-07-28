import Image from "next/image";
import Link from "next/link";
import TodayEvents from "@/components/calender/TodayEvents"

export default function Home() {
  return (
    <div className="w-full max-w-8xl mx-auto pt-10 px-6">
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
        {/* CENTER */}
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/logo2.gif"
              alt="Homepage symbol"
              width={600}
              height={600}
              className="h-[400px] w-[700px] object-contain"
              unoptimized
            />

          <a
            href="YOUR_GOOGLE_FORM_LINK"
            target="_blank"
            rel="noopener noreferrer"
            className="
              -mt-2
              rounded-full
              bg-white
              px-8
              py-3
              text-base
              font-semibold
              text-black
              transition
              duration-200
              hover:scale-105
              hover:bg-neutral-200
            "
          >
            Nollankäten
          </a>
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
