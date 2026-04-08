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
  { id: "1", name: "Cheif Wade P Sam", image: "/cards/Tray.png", password: "RideTheLightning" , description: "" },
  
  { id: "2", name: "Moe D. Low", image: "/cards/Gru.png", password: "grukencheck", 
    description: `Långt ute i kosmos vakade den uråldriga röda dvärgstjärnan över världsalltets ordning. Under Vågens tecken satt Moe D. Low och lyssnade till stjärnornas oroliga viskningar om en obalans på jorden. 
                  Mörkret hade i hemlighet samlat sina krafter där för att släcka Nollans gnista och sprida kaos. 
                  När harmonin på den lilla blå planeten plötsligt vägrade gå exakt jämnt ut kallades den vise vicen ner från himlavalvet för att ta hand om de brutna resterna. 
                  Med sin djupröda mantel svept tätt omkring sig föll Moe som ett glödande stjärnfall rakt genom atmosfären och landade mitt i den jättejättejätte kalla natten. 
                  Väl på plats anslöt Moe omedelbart till sina syskon för att gemensamt möta hotet. Nu står Moe ständigt redo att lugnt kliva fram när tillvaron krånglar. 
                  Med sin mantel kommer den vise att väva ett sprakande rött norrsken som ska driva bort skuggorna och omsluta Nollan i trygghet, kanske.
`},
  
  { id: "3", name: "Penny G. Arflode", image: "/cards/Mary.png", password: "φυτάγεια", description: "" },
  
  { id: "4", name: "Ray. L. Wade", image: "/cards/Cloe.png", password: "stampontheground", description: "" },
  
  { id: "5", name: "Blenda A Lay", image: "/cards/Ace.png", password: "aceärbäst123" ,description: ""},
  
  { id: "6", name: "Wayle Lough P", image: "/cards/Vicki.png", password: "ganskahemligt123", 
    description: `Wayle tror att saker händer honom om och om och om och om och om och om igen. Till exempel så hade Wayle en dag då Wayle skulle gå och köpa en ananas. 
                  Så Wayle gick till Wayles jätte jätte jätte favorit ananas butik. Där köpte Wayle en ananas och gick hem. Väl hemma tittade Wayle på ananasen och tänkte att det här va för lite ananaser.
                  Så Wayle gick till Wayles jätte jätte jätte favorit ananas butik. Där köpte Wayle en till ananas och gick hem. Väl hemma tittade Wayle på Wayles ananaser och tänkte att det här va för lite ananaser.
                  Så Wayle gick till Wayles jätte jätte jätte favorit ananas butik. Där köpte Wayle en till ananas och gick hem. Väl hemma tittade Wayle på Wayles ananaser och tänkte att det här va för lite ananaser.
                  Så Wayle gick till Wayles jätte jätte jätte favorit ananas butik. Där köpte Wayle en till ananas och gick hem. Väl hemma tittade Wayle på Wayles ananaser och tänkte att det här är ett bra antal ananaser. Då drog Wayle en snabb breakdance och gick vidare med Wayles dag.
`},
  
  { id: "7", name: "Kong Kurtinator", image: "/cards/Drew.png", password: "URAQTPI", 
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
                  ` 
  },

  { id: "8", name: "Rose P. Anther", image: "/cards/Carly.png", password: "legocastlearchitect", description: "" },
  
  { id: "9", name: "Stella Tilde", image: "/cards/Ally.png", password: "Cyglapaugeodeis", description: "" },
  
  { id: "10", name: "Wick Thorfield", image: "/cards/Con Soul.png", password: "POUNDERTHAORB", description: "" },
  
  { id: "11", name: "Gloria S. Kai", image: "/cards/Moe.png", password: "LösMoesord", description: "" },
  
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
    <main className="flex flex-col items-center mt-2 px-6">
      <p className="text-xl mb-4 text-white">Har Nollan hittat ett lösenord? Testa skriva in det här, kanske.</p>

      <div className="flex gap-2 mb-8">
        <Input
          type="text"
          placeholder="Lösenord..."
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleUnlock()
          }}
          className="w-72 text-white"
        />
        <button
          onClick={handleUnlock}
          className="px-4 py-2 rounded-md bg-neutral-300 text-black hover:bg-gray-200"
        >
          Lås in
        </button>
      </div>

      {message && <p className="text-white mb-6">{message}</p>}

      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-50 w-full max-w-6xl">   {/* LEFT SIDE: text panel */}
        <div className="w-full max-w-md min-h-[320px] rounded-2xl bg-gray-200/2 backdrop-blur-sm p-6 text-white">
          {isCurrentUnlocked ? (
            <>
              <h2 className="text-2xl font-bold mb-4">{currentCard.name}</h2>
              <p className="leading-relaxed text-white/90">
                {currentCard.description}
              </p>
            </>
          ) : (
            <div className="h-full flex flex-col justify-center items-center text-center">
              <h2 className="text-2xl font-bold mb-4 text-white/60">
                Låst
              </h2>
              <p className="text-white/50">
                Nollan behöver mata in ett giltigt lösenord kanske
              </p>
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
  <div className="w-full max-w-[300px] shrink-0">
    <Carousel setApi={setApi} className="w-full">
      <CarouselContent>
        {cards.map((card) => {
          const isUnlocked = unlockedIds.includes(card.id)

          return (
            <CarouselItem key={card.id}>
              <Card className="bg-gray-100/1 border-none">
                <CardContent className="p-4 flex items-center justify-center">
                  <div className="relative w-full aspect-[60/86]">
                    {isUnlocked ? (
                      <Image
                        src={card.image}
                        alt={card.name}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white/60">
                        <p className="text-lg font-semibold mb-2">{card.name}</p>
                        <p>Låst</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          )
        })}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
      </div>
    </main>
  )
}