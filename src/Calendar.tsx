import React, { useEffect, useMemo, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import iCalendarPlugin from '@fullcalendar/icalendar';

interface CalendarProps {
  icsData: string;
}

const Calendar: React.FC<CalendarProps> = ({ icsData }) => {
  const [icsUrl, setIcsUrl] = useState(URL.createObjectURL(new Blob([icsData], { type: 'text/calendar' })));

  useEffect(() => {
    console.log("ICS data changed")
    const blob = new Blob([icsData], { type: 'text/calendar' });
    setIcsUrl(URL.createObjectURL(blob));
    calendarRef?.getApi().refetchEvents();
  }, [icsData])
  

  // ref for the FullCalendar
  const [calendarRef, setCalendarRef] = useState<FullCalendar | null>(null);

  return (
    <div>
      <FullCalendar 
        plugins={[dayGridPlugin, iCalendarPlugin]}
        initialView="dayGridMonth"
        events={{url: icsUrl, format: 'ics'}}
        ref = {setCalendarRef}
      />
    </div>
  );
};
export default Calendar;
