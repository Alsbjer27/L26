import * as React from "react";

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel"

export default function Idolkort(){
    return(
    <Carousel className="w-full max-w-xs mx-auto">
      <CarouselContent>
        {Array.from({ length: 12 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-0.2">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-4">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    )
}