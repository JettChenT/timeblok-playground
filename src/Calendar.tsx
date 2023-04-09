import React, { useEffect, useMemo, useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import iCalendarPlugin from '@fullcalendar/icalendar';

interface CalendarProps {
  icsData: string;
  initialView: InitialViewOptions;
}

type InitialViewOptions = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';

const Calendar: React.FC<CalendarProps> = ({ icsData, initialView }) => {
  const [icsUrl, setIcsUrl] = useState(URL.createObjectURL(new Blob([icsData], { type: 'text/calendar' })));
  const [height, setHeight] = useState<number | undefined>(0);
  const calendarRef = useRef<FullCalendar | null>(null);

  const calendarWrapperRef = useRef<HTMLDivElement>(null);

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
  }, [initialView]);

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

