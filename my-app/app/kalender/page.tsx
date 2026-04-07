'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardFooter, CardDescription } from '@/app/components/ui/Card'
import { Button } from '@/app/components/ui/Button'
import {
  Pagination,
  PaginationNext,
  PaginationPrevious,
  PaginationContent,
  PaginationItem
} from './ui/pagination'

interface EventItem {
  summary: string
  location?: string
  start: { dateTime?: string; date?: string }
  end: { dateTime?: string; date?: string }
}

interface GetEventsProps {
  viewMode: 'day' | 'week'
  currentDate: string
  setCurrentDate: React.Dispatch<React.SetStateAction<string>>
  query: string
  currentWeekIndex: number
}

const WEEKS_COUNT = 2 // number of weeks to toggle between

export default function Schema() {
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day')
  const [query, setQuery] = useState('MT')
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0])
  const [currentWeekIndex, setCurrentWeekIndex] = useState<number>(0)

  const [isSolvedMed, setIsSolvedMed] = useState(false);

  useEffect(() => {
  const checkKeys = async () => {
    const allKeys = Object.keys(localStorage);
    
    try {
      const response = await fetch('/api/checkKeys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          foundKeys: allKeys,
          checkMultiple: [2, 0, 1, 5, 6] 
        })
      });
      
      const data = await response.json();
      setIsSolvedMed(data.isSolved);
    } catch (error) {
      console.error('Error checking keys:', error);
    }
  };
  
  checkKeys();
}, []);


  const openCalendarSubscription = (calendarId: string) => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

    if (isIOS) {
      // iOS: use webcal:// so it opens the native Calendar app subscription dialog
      window.open(
        `webcal://calendar.google.com/calendar/ical/${calendarId}%40group.calendar.google.com/public/basic.ics`,
        '_blank'
      )
    } else {
      // Android/web: Google Calendar subscription link
      window.open(
        `https://calendar.google.com/calendar/u/0/r?cid=${calendarId}@group.calendar.google.com`,
        '_blank'
      )
    }
  }


  const handleNext = () => {
    if (viewMode === 'day') {
      const nextDate = new Date(currentDate)
      nextDate.setDate(nextDate.getDate() + 1)
      setCurrentDate(nextDate.toISOString().split('T')[0])
    } else {
      setCurrentWeekIndex((p) => Math.min(p + 1, WEEKS_COUNT - 1))
    }
  }

  const handlePrevious = () => {
    if (viewMode === 'day') {
      const previousDate = new Date(currentDate)
      previousDate.setDate(previousDate.getDate() - 1)
      setCurrentDate(previousDate.toISOString().split('T')[0])
    } else {
      setCurrentWeekIndex((p) => Math.max(p - 1, 0))
    }
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1099px)')
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setViewMode('day')
      } else {
        setViewMode('week')
      }
    }

    handleMediaChange(mediaQuery)
    mediaQuery.addEventListener('change', handleMediaChange as EventListener)

    return () => mediaQuery.removeEventListener('change', handleMediaChange as EventListener)
  }, [])

  return (
    <div id="schema" className="w-5/6 sm:w-5/6 h-max mx-auto">
        <div className="flex-col flex justify-between sm:items-center mx-auto mb-4">
            <h1 className="text-5xl font-bold text-white mb-4">Schema</h1>
            <div>
                <div className="inline-flex mx-4 mb-10">
                    <Button
                    className={`rounded-r-none text-md ${viewMode === 'day' ? 'bg-yellow-100 text-black border-white' : 'text-white'}`}
                    variant="outline"
                    onClick={() => setViewMode('day')}
                    >
                    Idag
                    </Button>
                    <Button
                    className={`rounded-l-none text-md ${viewMode === 'week' ? 'bg-yellow-100 text-black border-white' : 'text-white'}`}
                    variant="outline"
                    onClick={() => setViewMode('week')}
                    >
                    Vecka
                    </Button>
                </div>

                <div className="inline-flex mx-4">

                    {/* MT tab */}
                    <Button
                        className={`rounded-r-none text-md ${query === 'MT' ? 'bg-orange-600 text-white' : ''}`}
                        variant="outline"
                        onClick={() => setQuery('MT')}
                    >
                        MT
                    </Button>

                    {/* MED tab — only visible when solved */}
                    {isSolvedMed && (
                        <Button
                            className={`rounded-none text-md ${
                                query === 'MED' ? 'bg-gray-800 text-white' : ''
                            }`}
                            variant="outline"
                            onClick={() => setQuery('MED')}
                        >
                            ?
                        </Button>
                    )}

                    {/* GDK tab */}
                    <Button
                        className={`rounded-l-none text-md ${query === 'GDK' ? 'bg-green-700 text-white' : ''}`}
                        variant="outline"
                        onClick={() => setQuery('GDK')}
                    >
                        GDK
                    </Button>
                </div>

                <Pagination>
                  <PaginationContent>
                    <div className="flex flex-col items-center justify-between w-full">
                    <h2 className="text-white font-semibold text-3xl mb-2">
                      {viewMode === 'day' ? '' : `Vecka ${currentWeekIndex + 1}`}
                    </h2>
                      {/* Left arrow */}
                      <div className='flex items-center justify-between w-full'>
                      <PaginationItem>
                      <PaginationPrevious
                        onClick={handlePrevious}
                        className={`text-lg p-4 ${
                        viewMode === 'week'
                          ? currentWeekIndex === 0
                          ? 'opacity-50 pointer-events-none'
                          : ''
                          : currentDate === new Date().toISOString().split('T')[0]
                          ? 'opacity-50 pointer-events-none'
                          : ''
                        }`}
                      />
                      </PaginationItem>

                      {/* Right arrow */}
                      <PaginationItem>
                      <PaginationNext
                        onClick={handleNext}
                        className={`text-lg p-4 ${
                        viewMode === 'week'
                          ? currentWeekIndex === WEEKS_COUNT - 1
                          ? 'opacity-50 pointer-events-none'
                          : ''
                          : ''
                        }`}
                      />
                      </PaginationItem>
                      </div>
                    </div>
                  </PaginationContent>
                </Pagination>
            </div>
        </div>

      <GetEvents
        viewMode={viewMode}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        query={query}
        currentWeekIndex={currentWeekIndex}
      />
    <div className="flex flex-col  justify-center mt-8">
      <h3 className="text-orange-100 font-semibold mt-4 text-2xl">Prenumerera på kalendern: </h3>
      <div className="flex space-x-8 py-2">
        <Button
          variant="secondary"
          className="overflow-clip text-white font-bold bg-accent hover:bg-orange-600 border-orange-600 border-3 text-lg p-5" 
          onClick={() => openCalendarSubscription('01fce5a8500cbf91c25477f99824d51adec96e2e22fb3711efdf1edac911e7d5')}
        >
          För MT
        </Button>
        <Button
          variant="secondary"
          className="overflow-clip text-white font-bold bg-accent hover:bg-green-700 border-green-700 border-3 text-lg p-5"
          onClick={() => openCalendarSubscription('6a275b293e9d21fa01ce4c5c1558d08c05e705df7dbe577a1b03da55281a33e7')}

        >
          För GDK
        </Button>
      </div>
      {/* <p className="text-orange-100 opacity-50 text-lg">
        Du kan prenumerera på kalendern genom att lägga till en ny kalender i din kalenderapp och klistra in länken, som du får genom att klicka på ditt program ovan.
      </p> */}
      <p className="text-orange-100 opacity-50 text-lg mb-4">
        Prenumerera på kalendern för att få alla aktiviteter direkt i din kalenderapp.
      </p>

      </div>
    </div>
  )
}

/* ============================
   GetEvents component (week/day rendering, robust date handling)
   ============================ */
function GetEvents({ viewMode, currentDate, query, currentWeekIndex }: GetEventsProps) {
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
          console.error('Failed to fetch events:', res.statusText)
        }
      } catch (error) {
        console.error('Error fetching events:', error)
      }
      finally {
        setLoading(false)
      } 
    }

    fetchEvents()
  }, [query])

  // safe parser for event start -> Date | null
  function parseEventStartToDate(start: { dateTime?: string; date?: string } | undefined): Date | null {
    if (!start) return null
    if (start.dateTime) {
      const d = new Date(start.dateTime)
      return isNaN(d.getTime()) ? null : d
    }
    if (start.date) {
      // ensure we convert date-only to a valid Date (midnight)
      const d = new Date(start.date + 'T00:00:00')
      return isNaN(d.getTime()) ? null : d
    }
    return null
  }

  function formatYMD(d: Date) {
    if (!d || isNaN(d.getTime())) return ''
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  function formatDateTime(dateTimeString: string): [string, string] {
    const dateObj = new Date(dateTimeString)
    if (isNaN(dateObj.getTime())) return ['', '']
    const year = dateObj.getFullYear()
    const month = String(dateObj.getMonth() + 1).padStart(2, '0')
    const day = String(dateObj.getDate()).padStart(2, '0')
    const hours = String(dateObj.getHours()).padStart(2, '0')
    const minutes = String(dateObj.getMinutes()).padStart(2, '0')
    return [`${year}-${month}-${day}`, `${hours}:${minutes}`]
  }

  // build eventsByDate
  const eventsByDate: Record<string, EventItem[]> = {}
  events.forEach((ev) => {
    const dt = parseEventStartToDate(ev.start)
    const key = dt ? formatYMD(dt) : null
    if (key) {
      if (!eventsByDate[key]) eventsByDate[key] = []
      eventsByDate[key].push(ev)
    }
  })

  // Decide which Monday to use as the base for the weeks:
  // prefer earliest event date if available, otherwise use currentDate
  const parsedEventDates = events.map((e) => parseEventStartToDate(e.start)).filter((d): d is Date => d !== null)
  const baseDateForWeeks = parsedEventDates.length > 0 ? new Date(Math.min(...parsedEventDates.map((d) => d.getTime()))) : new Date(currentDate + 'T00:00:00')

  // get Monday for a given date
  function getMonday(date: Date) {
    const d = new Date(date)
    const day = d.getDay() // 0 (Sun) - 6 (Sat)
    // we want monday = 1. If sunday (0) => go back 6
    const diff = (day === 0 ? -6 : 1) - day
    d.setDate(d.getDate() + diff)
    d.setHours(0, 0, 0, 0)
    return d
  }

  // generate weeks starting on Monday
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

  // localized weekday name (svenska short) - safe fallback
  function weekdayShort(dateStr: string) {
    const d = new Date(dateStr + 'T00:00:00')
    if (isNaN(d.getTime())) return ''
    // make capitalized
    return d.toLocaleDateString('sv-SE', { weekday: 'long' }).charAt(0).toUpperCase() + d.toLocaleDateString('sv-SE', { weekday: 'long' }).slice(1)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-yellow-100"></div>
      </div>
    )
  }


  return (
    <div>
      <div className={`rounded-xl border-yellow-100 border-2 ${viewMode === 'day' ? 'flex flex-col' : 'sm:grid sm:grid-cols-7'}`}>
          {viewMode === 'day' ? (
            <div className="bg-[#3a0000] rounded-xl border-yellow-100 border p-2">
              <h2 className="text-center font-semibold mt-2 text-lg">{weekdayShort(currentDate)}</h2>
              <h2 className="text-center font-bold">{currentDate}</h2>

              {(eventsByDate[currentDate] || []).map((event, idx) => (
                <Card
                  key={idx}
                  className={`my-6 sm:mx-auto text-white shadow-lg hover:scale-105 transition-transform duration-200 ${
                    parseFloat(formatDateTime(event.end.dateTime || event.end.date!)[1]) -
                      parseFloat(formatDateTime(event.start.dateTime || event.start.date!)[1]) >
                    2
                      ? 'min-h-54'
                      : 'min-h-20'
                  }`}
                  style={{
                    backgroundColor: currentDate === todayStr ? '#800000' : '#4a0000',
                    color: '#dbce9c',
                    borderColor: '#dbce9c',
                    borderWidth: '1px',
                  }}
                >
                  <CardHeader className="p-3 pb-0">
                    <CardTitle className="text-md font-bold text-white">
                      {event.summary.split('-').map((part, i, arr) =>
                        i < arr.length - 1 ? (
                          <React.Fragment key={i}>
                            {part.trim()}-
                            <br />
                          </React.Fragment>
                        ) : (
                          part.trim()
                        )
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardDescription className="mb-2 pl-3 text-sm font-thin">
                    {event.location ? event.location : 'Plats kommer snart'}
                  </CardDescription>
                  <CardFooter className="text-sm pl-3">
                    {formatDateTime(event.start.dateTime || event.start.date!)[1]} -{' '}
                    {formatDateTime(event.end.dateTime || event.end.date!)[1]}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
          /* ----- Week view (Monday -> Sunday, show empty days) ----- */
          currentWeekDates.map((date, index) => {
            const isToday = date === todayStr
            return (
              <div key={date} className={`p-2 ${isToday ? 'border-yellow-100' : '' } ${index % 2 === 0 ? 'bg-[#3a0000]' : 'bg-[#2a0000]'} ${(index === 0) ? 'rounded-tl-xl sm:rounded-bl-xl rounded-tr-xl' : ''} ${(index === 6) ? 'sm:rounded-tr-xl rounded-bl-xl rounded-br-xl' : ''}`}>
                <h3 className="text-center font-semibold mt-2 text-lg">{weekdayShort(date)}</h3>
                <h2 className="text-center font-bold">{date}</h2>

                {(eventsByDate[date] || []).map((event, idx) => (
                  <Card
                    key={idx}
                    className={`my-6 sm:mx-auto text-white shadow-lg hover:scale-105 transition-transform duration-200 ${
                      parseFloat(formatDateTime(event.end.dateTime || event.end.date!)[1]) -
                        parseFloat(formatDateTime(event.start.dateTime || event.start.date!)[1]) >
                      2
                        ? 'min-h-54'
                        : 'min-h-20'
                    }`}
                    style={{
                      backgroundColor: isToday ? '#800000' : '#4a0000',
                      color: '#dbce9c',
                      borderColor: '#dbce9c',
                      borderWidth: '1px',
                    }}
                  >
                    <CardHeader className="p-3 pb-0 ">
                      <CardTitle className="text-md font-bold text-white">
                        {event.summary.split('-').map((part, i, arr) =>
                          i < arr.length - 1 ? (
                            <React.Fragment key={i}>
                              {part.trim()}-
                              <br />
                            </React.Fragment>
                          ) : (
                            part.trim()
                          )
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardDescription className="mb-2 pl-3 text-sm font-thin">
                      {event.location ? event.location : 'Plats kommer snart'}
                    </CardDescription>
                    <CardFooter className="text-sm pl-3">
                      {formatDateTime(event.start.dateTime || event.start.date!)[1]} -{' '}
                      {formatDateTime(event.end.dateTime || event.end.date!)[1]}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
