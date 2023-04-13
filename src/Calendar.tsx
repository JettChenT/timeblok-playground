import React, { useEffect, useMemo, useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import iCalendarPlugin from '@fullcalendar/icalendar';
import { useTimeBlokStore } from './state';

type InitialViewOptions = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';

interface CalendarProps {
  calendarRef: React.RefObject<FullCalendar>;
}

const Calendar = ({ calendarRef }: CalendarProps) => {
  const [height, setHeight] = useState<number | undefined>(0);

  const calendarWrapperRef = useRef<HTMLDivElement>(null);

  const icsData = useTimeBlokStore(state => state.rightText);
  const initialView = useTimeBlokStore(state => state.view);
  const [icsUrl, setIcsUrl] = useState(URL.createObjectURL(new Blob([icsData], { type: 'text/calendar' })))

  useEffect(() => {
    console.log("ICS data changed")
    const blob = new Blob([icsData], { type: 'text/calendar' });
    URL.revokeObjectURL(icsUrl);
    setIcsUrl(URL.createObjectURL(blob));
    calendarRef?.current?.getApi().refetchEvents();
  }, [icsData])

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView(initialView);
    }
  }, [initialView])// Listen for changes in the view type of the calendar and update the initialView accordingly

  // Also a hack
  useEffect(() => {
    function handleResize() {
      if (calendarWrapperRef.current) {
        setHeight(calendarWrapperRef.current.parentElement?.clientHeight);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calendarWrapperRef]);

  return (
    <div className='h-full' ref={calendarWrapperRef}>
      <FullCalendar 
        plugins={[dayGridPlugin, iCalendarPlugin, timeGridPlugin, listPlugin]}
        initialView={initialView}
        events={{url: icsUrl, format: 'ics'}}
        ref={calendarRef}
        headerToolbar={{
          left: 'prev,next today',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        height={`${height}px`}
      />
    </div>
  );
};
export default Calendar;

export type { InitialViewOptions };

