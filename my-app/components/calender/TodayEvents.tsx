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
    <section className="w-full rounded-3xl border border-white/10 bg-black/35 backdrop-blur-md shadow-xl p-5 md:p-6">
      <div className="mb-4">
        <h2 className={`text-2xl font-bold text-center ${titleClassName}`}>
          {title}
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[180px]">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white" />
        </div>
      ) : todaysEvents.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 px-6 py-10 text-center text-white/50">
          Inga aktiviteter idag
        </div>
      ) : (
        <div className="space-y-3">
          {todaysEvents.map((event, index) => (
            <Card
              key={index}
              className="rounded-2xl border border-white/10 bg-black/30 shadow-none"
            >
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-white text-base leading-snug">
                  {event.summary}
                </CardTitle>
              </CardHeader>

              <CardDescription className="px-4 text-sm text-white/60">
                {event.location || "Plats kommer snart"}
              </CardDescription>

              <CardFooter className="px-4 pt-3 text-sm text-white/80">
                {formatTime(event.start.dateTime)}
                {event.start.dateTime && event.end.dateTime ? " - " : ""}
                {formatTime(event.end.dateTime)}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}