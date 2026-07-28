import Image from "next/image";
import Link from "next/link";
import TodayEvents from "@/components/calender/TodayEvents";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <div
        className="
          w-full max-w-[1440px] mx-auto
          px-4 sm:px-6
          pt-6 md:pt-10
          pb-12
        "
      >
        <div
          className="
            grid grid-cols-1
            lg:grid-cols-[minmax(0,1fr)_minmax(280px,1.15fr)_minmax(0,1fr)]
            gap-8 lg:gap-10 xl:gap-14
            items-start
          "
        >
          {/* CENTER: first on mobile, middle on desktop */}
          <section
            className="
              order-1
              lg:order-2
              flex flex-col
              items-center justify-center
              min-w-0
            "
          >
            <Image
              src="/Logo2.gif"
              alt="Legionen"
              width={600}
              height={600}
              unoptimized
              className="
                w-full
                max-w-[330px]
                sm:max-w-[420px]
                lg:max-w-[520px]
                h-auto
                object-contain
              "
            />

            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSfaIeKdbCE-xuRHNWzKdftuczK0ENEj9f3_fvNI33vGV-Zq7Q/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-4
                inline-flex
                min-h-12
                items-center justify-center
                rounded-full
                bg-white
                px-8 py-3
                font-semibold text-black
                transition
                hover:bg-neutral-200
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white
              "
            >
              Nollankäten
            </Link>
          </section>

          {/* MT: second on mobile, left on desktop */}
          <section
            className="
              order-2
              lg:order-1
              w-full
              max-w-md
              mx-auto
            "
          >
            <TodayEvents
              query="MT"
              title="MT idag"
              titleClassName="text-orange-200"
            />
          </section>

          {/* GDK: third on mobile, right on desktop */}
          <section
            className="
              order-3
              lg:order-3
              w-full
              max-w-md
              mx-auto
            "
          >
            <TodayEvents
              query="GDK"
              title="GDK idag"
              titleClassName="text-green-200"
            />
          </section>
        </div>

      </div>
    </main>
  );
}
