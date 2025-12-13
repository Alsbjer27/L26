import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-10 px-6 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight transition-colors duration-300 hover:text-[#9E0000]">
        My first Next.js site
      </h1>
      <p className="max-w-lg text-lg text-gray-700">
        Learning tailwindcss and next.js together!
      </p>
      
      <Link href="/idolkort" className="inline-flex items-center justify-center rounded-lg bg-[#9E0000] px-6 py-3 font-semibold text-white hover:bg-red-700 transition-colors">
        Go to Idolkort
      </Link>
    </main>
  );
}
