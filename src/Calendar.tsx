import React, { useEffect, useMemo, useState } from 'react';
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

  useEffect(() => {
    console.log("ICS data changed")
    const blob = new Blob([icsData], { type: 'text/calendar' });
    URL.revokeObjectURL(icsUrl);
    setIcsUrl(URL.createObjectURL(blob));
    calendarRef?.getApi().refetchEvents();
  }, [icsData])

  useEffect(() => {
    if (calendarRef) {
      calendarRef.getApi().changeView(initialView);
    }
  }, [initialView]);

  // ref for the FullCalendar
  const [calendarRef, setCalendarRef] = useState<FullCalendar | null>(null);

  return (
    <div className='h-full'>
      <FullCalendar 
        plugins={[dayGridPlugin, iCalendarPlugin, timeGridPlugin, listPlugin]}
        initialView={initialView}
        events={{url: icsUrl, format: 'ics'}}
        ref = {setCalendarRef}
        headerToolbar={{
          left: 'prev,next today',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
      />
    </div>
  );
};
export default Calendar;

export type { InitialViewOptions };

