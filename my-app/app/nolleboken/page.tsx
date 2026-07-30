import Image from "next/image";

const books = [
  {
    title: "Medieteknik",
    shortTitle: "MT",
    cover: "/nollebok/mtbook.svg",
    pdf: "/nollebok/MT-Nolleboken.pdf",
    alt: "Omslag till Medietekniks nollebok",
  },
  {
    title: "Grafisk design och kommunikation",
    shortTitle: "GDK",
    cover: "/nollebok/gdkbook.svg",
    pdf: "/nollebok/GDK-Nolleboken.pdf",
    alt: "Omslag till GDK:s nollebok",
  },
];

export default function Nolleboken() {
  return (
    <main className="px-4 py-8 text-white sm:px-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <section className="mx-auto mb-10 max-w-2xl text-center">
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl">Nolleboken</h1>
          <p className="text-base leading-relaxed text-white/75">
            Här kan Nollan läsa Nolleboken digitalt. Välj boken för programmet
            du läser.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
          {books.map((book) => (
            <article
              key={book.shortTitle}
              className="flex flex-col items-center rounded-3xl border border-white/10 bg-black/35 p-5 shadow-xl backdrop-blur-md sm:p-7"
            >
              <h2 className="mb-5 min-h-7 text-center text-xl font-semibold text-neutral-100">
                {book.title}
              </h2>

              <a
                href={book.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-center rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label={`Öppna ${book.shortTitle}-Nolleboken som PDF`}
              >
                <Image
                  src={book.cover}
                  alt={book.alt}
                  width={320}
                  height={320}
                  className="h-auto w-full max-w-[280px] transition-transform duration-200 group-hover:scale-[1.03]"
                />
              </a>

              <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
                <a
                  href={book.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-white px-5 py-3 font-semibold text-black transition hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Öppna PDF
                </a>
                <a
                  href={book.pdf}
                  download
                  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-white/25 px-5 py-3 font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Ladda ner
                </a>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
