"use client"

import * as React from "react"
import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi
} from "@/components/ui/carousel"

type CardData = {
  id: string
  name: string
  image: string
  password: string
  description: string
}

const cards: CardData[] = [
  { id: "1", name: "Cheif Wade P Sam", image: "/cards/Tray.png", password: "LOCALHOSTHOST" , description: `En gång vandrade han över kosmiska slätter där stjärnbilderna själva testade hans styrka. 
                    Oxens kraft rann genom hans blod – tålamod som ett berg, styrka som en storm, och envishet över allting som inte betydde någonting.
                    Och när mörkret rörde sig – rörde sig också Chief Wade P Sam.
                    Han anlände utan förvarning.
                    Trots hans dåliga syn och förfärliga lokalsinne hittade han alltid rätt.
                    Blicken dold bakom hans svarta solglasögon.
                    Energin tung som staven han själv höll i.
`},
  
  { id: "2", name: "Moe D. Low", image: "/cards/Gru.png", password: "grukencheck", 
    description: `Långt ute i kosmos vakade den uråldriga röda dvärgstjärnan över världsalltets ordning. Under Vågens tecken satt Moe D. Low och lyssnade till stjärnornas oroliga viskningar om en obalans på jorden. 
                  Mörkret hade i hemlighet samlat sina krafter där för att släcka Nollans gnista och sprida kaos. 
                  När harmonin på den lilla blå planeten plötsligt vägrade gå exakt jämnt ut kallades den vise vicen ner från himlavalvet för att ta hand om de brutna resterna. 
                  Med sin djupröda mantel svept tätt omkring sig föll Moe som ett glödande stjärnfall rakt genom atmosfären och landade mitt i den jättejättejätte kalla natten. 
                  Väl på plats anslöt Moe omedelbart till sina syskon för att gemensamt möta hotet. Nu står Moe ständigt redo att lugnt kliva fram när tillvaron krånglar. 
                  Med sin mantel kommer den vise att väva ett sprakande rött norrsken som ska driva bort skuggorna och omsluta Nollan i trygghet, kanske.
`},
  
  { id: "3", name: "Neah B. Louza", image: "/cards/Mary.png", password: "etintrof", description: `Neah B. Louza föddes i stjärntecknet fiskarna under det röda norrskenets dans, på en kväll när himlen var jätte jätte jätte jätte fin. 
                    Egentligen vet ingen riktigt varför just Neah blev född i fiskarnas tecken. Kanske för att universum tyckte att någon behövde vara disträ, drömmande och smått klumpig på samma gång. Eller kanske ingen anledning alls.
                    Neah är universums självutnämnda expert på att stirra ut i tomma intet. Hon kan stå i jätte jätte jätte jätte många minuter medan hon funderar högt på livets viktiga frågor, som varför kometer inte har smak eller om meteorer egentligen är rymdens popcorn. 
                    Hennes mantel är alltid ett potentiellt hinder, och ibland snubblar hon över sina egna fötter… Men det är okej, någon måste ju göra universum lite mer underhållande.
                    Disträ? Absolut. Förrvirrad? Definitivt. Charmig? Oerhört. Hon kan börja gå åt ett håll och sluta i ett helt annat, mitt i en mening om spiraler av stjärnstoft, och ändå hitta exakt det som behövs. Nollan kan alltid lita på att hon är där för att visa vägen, även om det tar tio minuter att komma dit... 
  ` },
  
  { id: "4", name: "Ray. L. Wade", image: "/cards/Cloe.png", password: "DivineBeastDancingLionofficialsoundtrack", description: `Ray L. Wade är bara mästare på en sak: Att vara förvirrad. 
                    Om en väg delar sig i två kommer Ray utan tvekan gå åt ett tredje håll. Om någon frågar honom vad klockan är, svarar han ofta något i stil med: “Ja, jag tycker också att logistik ska ha ett eget festeri.” 
                    Det är inte att han försöker vara filosofisk, han är bara dummare än vad han ser ut. Eller så är han precis lika dum som han ser ut. 
                    Trots sin brist på riktning, logik och ibland verklighetsförankring fortsätter Ray L. Wade sin resa från den röda dvärgen, oftast åt fel håll, men alltid med full övertygelse.
`},
  
  { id: "5", name: "Blenda A Lay", image: "/cards/Ace.png", password: "Kopierat" ,description: `Som kräfta i stjärntecken finns en mjukare sida i Blenda. 
                    Hon är lojal, beskyddande och bryr sig mycket om Nollan. Hon minns små detaljer, kollar hur folk mår och kan vara oväntat eftertänksam mitt i allt stoj. 
                    Men den mjukheten ska inte misstas för svaghet. Under den röda manteln finns en uråldrig kraft, formad av norrskenets ljus och 794 år av att vaka över Nollan. 
                    Blenda är den som står kvar när andra tvekar, den som skrattar högst men också märker först när någon blir tyst. Blenda tycker om saker som är god design. Hon rör sig aldrig utan sin spork. 
`},
  
  { id: "6", name: "Wayle Lough P", image: "/cards/Vicki.png", password: "DoItAgain();", 
    description: `Wayle tror att saker händer honom om och om och om och om och om och om igen. Till exempel så hade Wayle en dag då Wayle skulle gå och köpa en ananas. 
                  Så Wayle gick till Wayles jätte jätte jätte favorit ananas butik. Där köpte Wayle en ananas och gick hem. Väl hemma tittade Wayle på ananasen och tänkte att det här va för lite ananaser.
                  Så Wayle gick till Wayles jätte jätte jätte favorit ananas butik. Där köpte Wayle en till ananas och gick hem. Väl hemma tittade Wayle på Wayles ananaser och tänkte att det här va för lite ananaser.
                  Så Wayle gick till Wayles jätte jätte jätte favorit ananas butik. Där köpte Wayle en till ananas och gick hem. Väl hemma tittade Wayle på Wayles ananaser och tänkte att det här va för lite ananaser.
                  Så Wayle gick till Wayles jätte jätte jätte favorit ananas butik. Där köpte Wayle en till ananas och gick hem. Väl hemma tittade Wayle på Wayles ananaser och tänkte att det här är ett bra antal ananaser. Då drog Wayle en snabb breakdance och gick vidare med Wayles dag.
`},
  
  { id: "7", name: "Kong Kurtinator", image: "/cards/Kong.png", password: "URAQTPI", 
    description: `När det röda norrskenet skapade stjärntecknen föddes Vattumannen – stjärnbilden för visionärer, uppfinnare och de som alltid tror att de är ett steg från ett stort genombrott.
                  Ur denna stjärnbild steg Kong Kurtinator fram. Kong bär ett så enormt hår och skägg att hela hans ansikte är täckt. Ingen har någonsin sett hans ögon. Inte ens Kong själv.
                  Men som en sann Vattuman ser han detta inte som ett problem, utan som ett mysterium som bara väntar på en genial lösning.
                  Därför arbetar han ständigt på nya revolutionerande idéer för hur man egentligen borde se världen. En av hans tidigaste teorier var ett system för att “titta väldigt hårt i rätt riktning”, vilket enligt honom borde göra att synen till slut bara uppstår av ren viljestyrka. 
                  När detta inte riktigt fungerade började han istället utveckla sitt mer avancerade koncept som han kallar “strategisk kisning”, vilket han beskriver som ett genombrott inom kosmisk perception.
                  När en legionär försiktigt föreslog att han kanske bara borde kamma bort håret från ögonen, svarade Kong stolt:
                  "Det där är precis den sortens gammalt tänkande jag försöker revolutionera."
                  Trots detta lyckas Kong Kurtinator ibland – till allas stora förvåning – navigera rätt när legionen färdas genom det röda norrskenet för att skydda Nollan.
                  Om det beror på kosmisk intuition…
                  eller bara osannolik tur…
                  är fortfarande ett mysterium.
`},

  { id: "8", name: "Rose P. Anther", image: "/cards/Carly.png", password: "Peanutbutterjelly", description: `I begynnelsen, när universum fortfarande försökte lista ut hur man stavade till “existens”, kom Rose P. Anther ur jungfruns tecken. 
                    Ingen vet exakt vad P:et står för, men Rose säger antingen “perfektion” eller “pesto” för att se vem som lyssnar. 
                    Vissa säger att P:et står för “perfektionist”. Anledningen är att Rose inte kan motstå att ändra planeternas omloppsbanor lite lite grann då de enligt henne “sitter lite snett”. 
                    Dock håller inte Rose med om det.
`},
  
  { id: "9", name: "Stella Tilde", image: "/cards/Ally.png", password: "BURNBOOK", description: `Stella Tilde har alltid haft en magisk energi omkring sig. När hon dök upp ur stjärnbilden Lejonet märkte de andra legionärerna ganska snabbt att det nästan alltid händer något när Stella är i närheten.
                    På något sätt lyckas Stella alltid samla folk runt sig. Inte för att hon måste – utan för att det nästan alltid blir roligare när hon är där.
                    De andra legionärerna har märkt att Stella nästan alltid kollar på filmen Mean Girls.
                    Hur många gånger hon sett den är oklart.
                    Vissa påstår att det är ungefär jätte jätte jätte många gånger.
                    Precis som Gretchen i filmen sägs det att Stellas lejonmanshår är full av hemligheter.
                    ​​Vad dessa hemligheter är vet ingen riktigt.
                    Men legionärerna har lagt märke till en sak:
                    Varje gång Stella tänker en stund och drar handen genom sin lejonman brukar något hända kort därefter.
                    Ibland en lek, ibland en tävling, ibland en aktivitet som ingen riktigt förstår förrän den redan har börjat.
                    Hur idéerna hamnar där från början är fortfarande ett mysterium.
                    Men Legionen har lärt sig att när Stella rör vid sin lejonman…
                    då är det bäst att vara redo.
`},
  
  { id: "10", name: "Wick Thorfield", image: "/cards/Con Soul.png", password: " puhctekxile", description: `När Wick föddes under Skorpionens stjärntecken hände något mårkligt. 
                     Stjärnornas krafter samlades och en del av deras energi blev en del av Wick. 
                     Med denna gåva kan Wick känna och styra de osynliga krafter som rör sig genom världen. 
                     Wick rör sig sällan utan att veta exakt vart riktningen leder.
                     Med hjälp av sin röda mantel bildar Wick magnetfält och strömmar, och låter dem flöda genom natthimlen som det röda norrskenet. På så sätt ser Wick till att mörkret aldrig når Nollan och att himlen över Norrköping alltid lyses upp av Legionens ljus.
                     När Wick känner sig busig kanske det förekommer att han påverkar sina syskons flow. Men när de frågar så har Wick självklart inget att göra med det.
`},
  
  { id: "11", name: "Gloria S. Caye", image: "/cards/Moe.png", password: "snattabananer", description: `Gloria är känd för sin energi. Hon är snabb, fri och alltid nästan på väg mot nästa äventyr. 
                     Skyttens kraft gör henne orädd och nyfiken. Om något blinkar, glittrar eller ser det minsta spännande ut i skenet är Gloria redan där och kollar vad det är.
                     Hon är den yngsta legionären och det märks ofta. Gloria gillar när saker är roliga och kan nästan inte låta bli att bli glad när något oväntat eller knasigt händer. 
                     Hon tycker helt enkelt världen blir bättre när saker är lite mindre seriösa.
                     Trots hennes busiga sida vet Gloria alltid vart hon siktar.
                     Hon tycker mest att alla borde sikta som henne *högre upp*, annars blir det ganska tråkigt
`},
  
  { id: "12", name: "Galileihoo Auf Ugglas", image: "/cards/Getrud.png", password: "Getterärbättreänfår123", description: "" }
]

export default function Idolkort() {
  const [inputPassword, setInputPassword] = React.useState("")
  const [unlockedIds, setUnlockedIds] = React.useState<string[]>([])
  const [message, setMessage] = React.useState("")
  const [api, setApi] = React.useState<CarouselApi>()
  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    const updateIndex = () => {
      setCurrentIndex(api.selectedScrollSnap())
    }

    updateIndex()
    api.on("select", updateIndex)

    return () => {
      api.off("select", updateIndex)
    }
  }, [api])

  function handleUnlock() {
    const matchedCard = cards.find((card) => card.password === inputPassword)

    if (!matchedCard) {
      setMessage("Wrong password")
      return
    }

    if (!unlockedIds.includes(matchedCard.id)) {
      setUnlockedIds((prev) => [...prev, matchedCard.id])
    }

    setMessage(`${matchedCard.name} UPPLÅST!!!`)
    setInputPassword("")
  }

  const currentCard = cards[currentIndex]
  const isCurrentUnlocked = unlockedIds.includes(currentCard.id)

  return (
  <main className="w-full flex flex-col items-center px-6 pt-4 text-white">
    {/* TOP PANEL */}
    <section className="w-full max-w-6xl rounded-2xl border border-white/10 bg-gray-200/5 backdrop-blur-sm p-6 mb-8">
      <div className="flex flex-col items-center text-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-wide text-orange-200">
            Idolkort
          </h1>
          <p className="text-white/70 mt-2">
            Har Nollan hittat ett lösenord? Testa skriva in det här, kanske.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 items-center">
          <Input
            type="text"
            placeholder="Lösenord..."
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleUnlock()
            }}
            className="w-72 text-white bg-black/20 border-white/15 placeholder:text-white/40"
          />

          <button
            onClick={handleUnlock}
            className="px-5 py-2 rounded-md bg-orange-200 text-black font-medium hover:bg-orange-100 transition-colors"
          >
            Lås in
          </button>
        </div>

        {message && (
          <p className="text-sm text-orange-200 bg-orange-200/10 border border-orange-200/20 px-4 py-2 rounded-full">
            {message}
          </p>
        )}

        <p className="text-sm text-white/50">
          {unlockedIds.length} / {cards.length} kort upplåsta
        </p>
      </div>
    </section>

    {/* CONTENT */}
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 w-full max-w-6xl items-start">
      {/* LEFT SIDE: text panel */}
      <div className="w-full h-[360px] rounded-2xl border border-white/10 bg-gray-200/5 backdrop-blur-sm p-6 text-white shadow-lg">
        {isCurrentUnlocked ? (
          <div className="h-full flex flex-col">
            <div className="shrink-0 border-b border-white/10 pb-4 mb-4">
              <p className="text-sm text-orange-200 mb-1">
                Upplåst kort
              </p>
              <h2 className="text-2xl font-bold">
                {currentCard.name}
              </h2>
            </div>

            <div className="overflow-y-auto flex-1 custom-scrollbar pr-2">
              <p className="leading-relaxed text-white/85 whitespace-pre-line">
                {currentCard.description || "Ingen beskrivning ännu."}
              </p>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col justify-center items-center text-center">
            <p className="text-sm text-orange-200/70 mb-2">
              Kort {currentIndex + 1} av {cards.length}
            </p>

            <h2 className="text-2xl font-bold mb-4 text-white/60">
              Låst
            </h2>

            <p className="text-white/50 max-w-sm">
              Nollan behöver mata in ett giltigt lösenord kanske.
            </p>
          </div>
        )}
      </div>

      {/* RIGHT SIDE: carousel */}
      <div className="w-full max-w-[320px] mx-auto lg:mx-0 shrink-0">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {cards.map((card) => {
              const isUnlocked = unlockedIds.includes(card.id)

              return (
                <CarouselItem key={card.id}>
                  <Card className="bg-gray-200/5 border border-white/10 backdrop-blur-sm shadow-lg">
                    <CardContent className="p-4 flex items-center justify-center">
                      <div className="relative w-full aspect-[60/86] rounded-xl overflow-hidden bg-black/20">
                        {isUnlocked ? (
                          <Image
                            src={card.image}
                            alt={card.name}
                            fill
                            className="object-contain"
                            unoptimized
                          />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white/60 px-4">
                            <p className="text-lg font-semibold mb-2">
                              {card.name}
                            </p>
                            <p className="text-sm text-orange-200/70">
                              Låst
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              )
            })}
          </CarouselContent>

          <CarouselPrevious className="bg-black/40 border-white/10 text-white hover:bg-white/10" />
          <CarouselNext className="bg-black/40 border-white/10 text-white hover:bg-white/10" />
        </Carousel>

        <p className="text-center text-sm text-white/50 mt-4">
          Kort {currentIndex + 1} av {cards.length}
        </p>
      </div>
    </section>
  </main>
)
}