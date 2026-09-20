import Image from "next/image";
import Link from "next/link";
import ClientForm from "@/components/ClientForm";

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
            lg:grid-cols-2
            gap-8 lg:gap-10 xl:gap-14
            items-start
          "
        >
          {/* CENTER: first on mobile, middle on desktop */}
          <section
            className="
              order-1
              lg:order-1
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
          </section>

          {/* Client information form */}
          <section
            className="
              order-2
              lg:order-2
              w-full
              max-w-xl
              mx-auto
            "
          >
            <ClientForm />
          </section>
        </div>

      </div>
    </main>
  );
}
