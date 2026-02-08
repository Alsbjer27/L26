  import * as React from "react";

  import { Card, CardContent } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
  import {
      Carousel,
      CarouselContent,
      CarouselItem,
      CarouselNext,
      CarouselPrevious
  } from "@/components/ui/carousel"

  type CardData = {
  id: string
  name: string
  image: string // public folder path for front
  password: string
}

  const cards: CardData[] = [
  { id: '1', name: 'Linus Magnusson', image: '/cards/Tray.png', password: 'RideTheLightning' },
  { id: '2', name: 'William Andersson', image: '/cards/Gru.png', password: 'grukencheck' },
  { id: '3', name: 'Emma Stenerhag', image: '/cards/Mary.png', password: 'φυτάγεια' },
  { id: '4', name: 'Hugo Backegårdh', image: '/cards/Cloe.png', password: 'stampontheground' },
  { id: '5', name: 'Julia Helgeström', image: '/cards/Ace.png', password: 'aceärbäst123' },
  { id: '6', name: 'Arvid Magnusson', image: '/cards/Vicki.png', password: 'ganskahemligt123' },
  { id: '7', name: 'Emil Alsbjer', image: '/cards/Drew.png', password: 'gniksihsac' },
  { id: '8', name: 'Julia Zackrisson', image: '/cards/Carly.png', password: 'legocastlearchitect' },
  { id: '9', name: 'Kajsa Frykestig', image: '/cards/Ally.png', password: 'Cyglapaugeodeis' },
  { id: '10', name: 'Nils Marion', image: '/cards/Con Soul.png', password: 'POUNDERTHAORB' },
  { id: '11', name: 'Amy Secka', image: '/cards/Moe.png', password: 'LösMoesord' },
  { id: '12', name: 'Maskot', image: '/cards/Getrud.png', password: 'Getterärbättreänfår123' }
]

  export default function Idolkort(){
      return(
        <main className="flex flex-col max-w-full max-h-full">
          <div>
            <h1 className="text-2xl font-bold mb-4 text-center">Idolkort</h1>
          </div>
          <div className="w-full flex justify-center mb-2">
            <Input type="text" placeholder="Lösenord..." className="w-min"/>
          </div>
          <Carousel className="w-full max-w-xs mx-auto">
          <CarouselContent>
            {cards.map((card) => (
              <CarouselItem key={card.id}>
                <div className="p-0.2">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-4">
                      <img src={card.image} alt={card.name} className="max-h-full max-w-full object-contain" />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        </main>
      )
  }