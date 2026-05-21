import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center px-6 text-white">
      <div className="flex flex-col items-center text-center max-w-3xl">
        <Image
          src="/Logo2.gif"
          alt="Legionen logo"
          width={700}
          height={400}
          className="w-[700px] max-w-full h-auto object-contain mb-8"
          unoptimized
        />

        <p className="text-2xl md:text-3xl text-white/80 mb-3">
          Webbplatsen är under konstruktion
        </p>

        <p className="text-lg md:text-xl text-white/50 max-w-xl">
          Vi arbetar just nu med att bygga upp sidan. Mer information kommer snart.
        </p>
      </div>
    </main>
  )
}