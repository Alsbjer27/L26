import Image from "next/image";
import Link from "next/link";

export default function Nolleboken() {
    return (
        <main className="min-h-screen px-6 py-10 text-white">
            <div className="mx-auto max-w-5xl">
                {/* Introduction */}
                <section className="mx-auto mb-10 max-w-2xl text-center">
                    <p className="text-base leading-relaxed text-white">
                        Här kan Nollan läsa Nolleboken digitalt. Waaaoowzaa!!! <br />
                        Bara tryck på boken till det program du läser Nollan!
                    </p>
                </section>

                {/* SVG links */}
                <section className="grid grid-cols-1 gap-10 md:grid-cols-2">
                    <Link
                        href="/nolleboken/mt"
                        className="group flex flex-col items-center"
                    >
                        <h2 className="mb-4 text-xl font-semibold text-neutral-100">
                            Medieteknik
                        </h2>

                        <div className="flex w-full items-center justify-center">
                            <Image
                                src="/nollebok/mtbook.svg"
                                alt="Öppna Medietekniks nollebok"
                                width={320}
                                height={320}
                                className="h-auto w-full max-w-[280px] transition-transform duration-200 group-hover:scale-105"
                            />
                        </div>
                    </Link>

                    <Link
                        href="/nolleboken/gdk"
                        className="group flex flex-col items-center"
                    >
                        <h2 className="mb-4 text-xl font-semibold text-neutral-100">
                            Grafisk design och kommunikation
                        </h2>

                        <div className="flex w-full items-center justify-center">
                            <Image
                                src="/nollebok/gdkbook.svg"
                                alt="Öppna GDK:s nollebok"
                                width={320}
                                height={320}
                                className="h-auto w-full max-w-[280px] transition-transform duration-200 group-hover:scale-105"
                            />
                        </div>
                    </Link>
                </section>
            </div>
        </main>
    );
}