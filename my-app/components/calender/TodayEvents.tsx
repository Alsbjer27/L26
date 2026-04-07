"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"

interface EventItem {
  summary: string
  location?: string
  start: { dateTime?: string; date?: string }
  end: { dateTime?: string; date?: string }
}

interface TodayEventsProps {
  query: "MT" | "GDK"
  title: string
  titleClassName?: string
}

export default function TodayEvents({
  query,
  title,
  titleClassName = "text-white",
}: TodayEventsProps) {
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)

  const today = new Date().toISOString().split("T")[0]

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)

      try {
        const res = await fetch(`/api/googlecal?q=${query}`)

        if (!res.ok) {
          console.error("Failed to fetch events:", res.statusText)
          return
        }

        const data: EventItem[] = await res.json()
        setEvents(data)
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [query])

  function getEventDate(event: EventItem): string | null {
    if (event.start.dateTime) {
      const d = new Date(event.start.dateTime)
      if (isNaN(d.getTime())) return null
      return d.toISOString().split("T")[0]
    }

    if (event.start.date) {
      return event.start.date
    }

    return null
  }

  function formatTime(value?: string): string {
    if (!value) return ""

    const d = new Date(value)
    if (isNaN(d.getTime())) return ""

    return d.toLocaleTimeString("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const todaysEvents = events.filter((event) => getEventDate(event) === today)

  return (
    <div className="w-full">
      <h2 className={`text-2xl font-bold text-center mb-4 ${titleClassName}`}>
        {title}
      </h2>

      {loading ? (
        <div className="text-white text-center">Laddar...</div>
      ) : todaysEvents.length === 0 ? (
        <div className="border border-[#dbce9c]/30 rounded-lg p-6 text-center text-[#dbce9c] opacity-70">
            Inga aktiviteter idag
        </div>
      ) : (
        <div className="space-y-4">
          {todaysEvents.map((event, index) => (
            <Card
              key={index}
              className="bg-[#4a0000] text-[#dbce9c] border border-[#dbce9c]"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-base">
                  {event.summary}
                </CardTitle>
              </CardHeader>

              <CardDescription className="px-6 text-sm text-[#dbce9c]">
                {event.location || "Plats kommer snart"}
              </CardDescription>

              <CardFooter className="text-sm text-[#dbce9c]">
                {formatTime(event.start.dateTime)}{" "}
                {event.start.dateTime && event.end.dateTime ? "-" : ""}
                {" "}
                {formatTime(event.end.dateTime)}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}