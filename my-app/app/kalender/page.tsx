"use client"

import React, { useState, useEffect } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationNext,
  PaginationPrevious,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"

interface EventItem {
  summary: string
  location?: string
  start: { dateTime?: string; date?: string }
  end: { dateTime?: string; date?: string }
}

interface GetEventsProps {
  viewMode: "day" | "week"
  currentDate: string
  setCurrentDate: React.Dispatch<React.SetStateAction<string>>
  query: string
  currentWeekIndex: number
}

const WEEKS_COUNT = 2

export default function Schema() {
  const [viewMode, setViewMode] = useState<"day" | "week">("day")
  const [query, setQuery] = useState("MT")
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  )
  const [currentWeekIndex, setCurrentWeekIndex] = useState<number>(0)
  const [isSolvedMed, setIsSolvedMed] = useState(false)

  useEffect(() => {
    const checkKeys = async () => {
      const allKeys = Object.keys(localStorage)

      try {
        const response = await fetch("/api/checkKeys", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            foundKeys: allKeys,
            checkMultiple: [2, 0, 1, 5, 6],
          }),
        })

        const data = await response.json()
        setIsSolvedMed(data.isSolved)
      } catch (error) {
        console.error("Error checking keys:", error)
      }
    }

    checkKeys()
  }, [])

  const openCalendarSubscription = (calendarId: string) => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

    if (isIOS) {
      window.open(
        `webcal://calendar.google.com/calendar/ical/${calendarId}%40group.calendar.google.com/public/basic.ics`,
        "_blank"
      )
    } else {
      window.open(
        `https://calendar.google.com/calendar/u/0/r?cid=${calendarId}@group.calendar.google.com`,
        "_blank"
      )
    }
  }

  const handleNext = () => {
    if (viewMode === "day") {
      const nextDate = new Date(currentDate)
      nextDate.setDate(nextDate.getDate() + 1)
      setCurrentDate(nextDate.toISOString().split("T")[0])
    } else {
      setCurrentWeekIndex((p) => Math.min(p + 1, WEEKS_COUNT - 1))
    }
  }

  const handlePrevious = () => {
    if (viewMode === "day") {
      const previousDate = new Date(currentDate)
      previousDate.setDate(previousDate.getDate() - 1)
      setCurrentDate(previousDate.toISOString().split("T")[0])
    } else {
      setCurrentWeekIndex((p) => Math.max(p - 1, 0))
    }
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1099px)")
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setViewMode("day")
      } else {
        setViewMode("week")
      }
    }

    handleMediaChange(mediaQuery)
    mediaQuery.addEventListener("change", handleMediaChange as EventListener)

    return () =>
      mediaQuery.removeEventListener("change", handleMediaChange as EventListener)
  }, [])

  const todayStr = new Date().toISOString().split("T")[0]

  return (
    <div id="schema" className="w-full max-w-7xl mx-auto px-4 md:px-6 py-2">
      {/* TOP PANEL */}
      <div className="mb-4 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl">
        <div className="flex flex-col gap-6 p-6 md:p-8">
          <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6">
            <div className="flex flex-col gap-4">
              {/* View Toggle */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  className={`rounded-full px-6 ${
                    viewMode === "day"
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-white border-white/20 hover:bg-white/10"
                  }`}
                  onClick={() => setViewMode("day")}
                >
                  Idag
                </Button>
                <Button
                  variant="outline"
                  className={`rounded-full px-6 ${
                    viewMode === "week"
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-white border-white/20 hover:bg-white/10"
                  }`}
                  onClick={() => setViewMode("week")}
                >
                  Vecka
                </Button>
              </div>

              {/* Program Toggle */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  className={`rounded-full px-6 ${
                    query === "MT"
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-transparent text-white border-white/20 hover:bg-white/10"
                  }`}
                  onClick={() => setQuery("MT")}
                >
                  MT
                </Button>

                {isSolvedMed && (
                  <Button
                    variant="outline"
                    className={`rounded-full px-6 ${
                      query === "MED"
                        ? "bg-zinc-700 text-white border-zinc-700"
                        : "bg-transparent text-white border-white/20 hover:bg-white/10"
                    }`}
                    onClick={() => setQuery("MED")}
                  >
                    ?
                  </Button>
                )}

                <Button
                  variant="outline"
                  className={`rounded-full px-6 ${
                    query === "GDK"
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-transparent text-white border-white/20 hover:bg-white/10"
                  }`}
                  onClick={() => setQuery("GDK")}
                >
                  GDK
                </Button>
              </div>
            </div>

            {/* Navigation */}
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <Pagination>
                <PaginationContent>
                  <div className="flex items-center gap-3">
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={handlePrevious}
                        className={`border border-white/10 rounded-full text-white hover:bg-white/10 ${
                          viewMode === "week"
                            ? currentWeekIndex === 0
                              ? "opacity-40 pointer-events-none"
                              : ""
                            : currentDate === todayStr
                            ? "opacity-40 pointer-events-none"
                            : ""
                        }`}
                      />
                    </PaginationItem>

                    <div className="min-w-[140px] text-center">
                      <p className="text-xs uppercase tracking-widest text-white/50">
                        {viewMode === "day" ? "Datum" : "Period"}
                      </p>
                      <p className="text-white font-semibold text-lg">
                        {viewMode === "day"
                          ? currentDate
                          : `Vecka ${currentWeekIndex + 1}`}
                      </p>
                    </div>

                    <PaginationItem>
                      <PaginationNext
                        onClick={handleNext}
                        className={`border border-white/10 rounded-full text-white hover:bg-white/10 ${
                          viewMode === "week" &&
                          currentWeekIndex === WEEKS_COUNT - 1
                            ? "opacity-40 pointer-events-none"
                            : ""
                        }`}
                      />
                    </PaginationItem>
                  </div>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CALENDAR SURFACE */}
      <div className="rounded-3xl border border-white/10 bg-black/35 backdrop-blur-md shadow-2xl p-4 md:p-6">
        <GetEvents
          viewMode={viewMode}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          query={query}
          currentWeekIndex={currentWeekIndex}
        />
      </div>

      {/* SUBSCRIPTIONS */}
      <div className="mt-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md shadow-xl p-6 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-white">
              Prenumerera på kalendern
            </h3>
            <p className="text-white/60 mt-2 max-w-2xl">
              Lägg till programkalendern i din kalenderapp så att aktiviteterna
              alltid finns tillgängliga.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              className="rounded-full px-6 py-5 text-white bg-orange-600 hover:bg-orange-500"
              onClick={() =>
                openCalendarSubscription(
                  "01fce5a8500cbf91c25477f99824d51adec96e2e22fb3711efdf1edac911e7d5"
                )
              }
            >
              För MT
            </Button>
            <Button
              variant="secondary"
              className="rounded-full px-6 py-5 text-white bg-emerald-700 hover:bg-emerald-600"
              onClick={() =>
                openCalendarSubscription(
                  "6a275b293e9d21fa01ce4c5c1558d08c05e705df7dbe577a1b03da55281a33e7"
                )
              }
            >
              För GDK
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function GetEvents({
  viewMode,
  currentDate,
  query,
  currentWeekIndex,
}: GetEventsProps) {
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(false)
  

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/googlecal?q=${query}`)
        if (res.ok) {
          const data: EventItem[] = await res.json()
          setEvents(data)
        } else {
          console.error("Failed to fetch events:", res.statusText)
        }
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [query])

  function parseEventStartToDate(
    start: { dateTime?: string; date?: string } | undefined
  ): Date | null {
    if (!start) return null
    if (start.dateTime) {
      const d = new Date(start.dateTime)
      return isNaN(d.getTime()) ? null : d
    }
    if (start.date) {
      const d = new Date(start.date + "T00:00:00")
      return isNaN(d.getTime()) ? null : d
    }
    return null
  }

  function formatYMD(d: Date) {
    if (!d || isNaN(d.getTime())) return ""
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  function formatDateTime(dateTimeString: string): [string, string] {
    const dateObj = new Date(dateTimeString)
    if (isNaN(dateObj.getTime())) return ["", ""]
    const year = dateObj.getFullYear()
    const month = String(dateObj.getMonth() + 1).padStart(2, "0")
    const day = String(dateObj.getDate()).padStart(2, "0")
    const hours = String(dateObj.getHours()).padStart(2, "0")
    const minutes = String(dateObj.getMinutes()).padStart(2, "0")
    return [`${year}-${month}-${day}`, `${hours}:${minutes}`]
  }

  const eventsByDate: Record<string, EventItem[]> = {}
  events.forEach((ev) => {
    const dt = parseEventStartToDate(ev.start)
    const key = dt ? formatYMD(dt) : null
    if (key) {
      if (!eventsByDate[key]) eventsByDate[key] = []
      eventsByDate[key].push(ev)
    }
  })

  const parsedEventDates = events
    .map((e) => parseEventStartToDate(e.start))
    .filter((d): d is Date => d !== null)

  const baseDateForWeeks =
    parsedEventDates.length > 0
      ? new Date(Math.min(...parsedEventDates.map((d) => d.getTime())))
      : new Date(currentDate + "T00:00:00")

  function getMonday(date: Date) {
    const d = new Date(date)
    const day = d.getDay()
    const diff = (day === 0 ? -6 : 1) - day
    d.setDate(d.getDate() + diff)
    d.setHours(0, 0, 0, 0)
    return d
  }

  const startOfFirstWeek = getMonday(baseDateForWeeks)
  const weeks: string[][] = []

  for (let w = 0; w < WEEKS_COUNT; w++) {
    const thisWeek: string[] = []
    const weekStart = new Date(startOfFirstWeek)
    weekStart.setDate(weekStart.getDate() + w * 7)

    for (let d = 0; d < 7; d++) {
      const day = new Date(weekStart)
      day.setDate(weekStart.getDate() + d)
      thisWeek.push(formatYMD(day))
    }

    weeks.push(thisWeek)
  }

  const currentWeekDates = weeks[currentWeekIndex] || []
  const todayStr = formatYMD(new Date())

  function weekdayShort(dateStr: string) {
    const d = new Date(dateStr + "T00:00:00")
    if (isNaN(d.getTime())) return ""
    const label = d.toLocaleDateString("sv-SE", { weekday: "long" })
    return label.charAt(0).toUpperCase() + label.slice(1)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[260px]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white" />
      </div>
    )
  }

  return (
    <div>
      {viewMode === "day" ? (
        <div className="max-w-3xl mx-auto">
          <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center">
            <p className="text-white/60 text-sm uppercase tracking-widest">
              {weekdayShort(currentDate)}
            </p>
            <h2 className="text-white text-2xl font-semibold">{currentDate}</h2>
          </div>

          <div className="space-y-4">
            {(eventsByDate[currentDate] || []).length > 0 ? (
              (eventsByDate[currentDate] || []).map((event, idx) => (
                <EventCard
                  key={idx}
                  event={event}
                  highlight={currentDate === todayStr}
                  formatDateTime={formatDateTime}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 px-6 py-12 text-center text-white/50">
                Inga aktiviteter denna dag.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-3">
          {currentWeekDates.map((date) => {
            const isToday = date === todayStr
            const dayEvents = eventsByDate[date] || []

            return (
              <div
                key={date}
                className={`rounded-2xl border p-3 min-h-[260px] ${
                  isToday
                    ? "border-white/30 bg-white/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="mb-4 text-center">
                  <p className="text-white/60 text-xs uppercase tracking-widest">
                    {weekdayShort(date)}
                  </p>
                  <h3 className="text-white font-semibold">{date}</h3>
                </div>

                <div className="space-y-3">
                  {dayEvents.length > 0 ? (
                    dayEvents.map((event, idx) => (
                      <EventCard
                        key={idx}
                        event={event}
                        highlight={isToday}
                        compact
                        formatDateTime={formatDateTime}
                      />
                    ))
                  ) : (
                    <div className="rounded-xl border border-dashed border-white/10 px-3 py-6 text-center text-xs text-white/40">
                      Inga aktiviteter
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function EventCard({
  event,
  highlight,
  compact = false,
  formatDateTime,
}: {
  event: EventItem
  highlight: boolean
  compact?: boolean
  formatDateTime: (dateTimeString: string) => [string, string]
}) {
  const startTime = formatDateTime(event.start.dateTime || event.start.date || "")[1]
  const endTime = formatDateTime(event.end.dateTime || event.end.date || "")[1]

  return (
    <Card
      className={`min-w-0 gap-2 overflow-hidden border py-0 shadow-none ${
        highlight
          ? "border-white/20 bg-black/40"
          : "border-white/10 bg-black/30"
      } ${compact ? "rounded-xl" : "rounded-2xl"}`}
    >
      <CardHeader className={compact ? "p-3 pb-1" : "p-4 pb-2"}>
        <CardTitle
          className={`min-w-0 whitespace-normal break-words [overflow-wrap:anywhere] text-white leading-snug ${
            compact ? "text-sm" : "text-base md:text-lg"
          }`}
        >
          {event.summary}
        </CardTitle>
      </CardHeader>

      <CardDescription
        className={`text-white/60 ${compact ? "px-3 text-xs" : "px-4 text-sm"}`}
      >
        {event.location || "Plats kommer snart"}
      </CardDescription>

      <CardFooter
        className={`text-white/80 ${compact ? "px-3 pb-3 pt-1 text-xs" : "px-4 pb-4 pt-1 text-sm"}`}
      >
        {startTime && endTime ? `${startTime} - ${endTime}` : "Tid saknas"}
      </CardFooter>
    </Card>
  )
}
