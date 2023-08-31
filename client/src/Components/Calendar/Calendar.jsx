import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
export default function Calendar() {
  return (
    <>
      <div className="w-full">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          windowResizeDelay={150}
          contentHeight={"auto"}
          aspectRatio={1}
          nowIndicator
          expandRows={true}
          headerToolbar={{
            start: "prev,next today",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          handleWindowResize
          locale={"es"}
        />
      </div>
    </>
  );
}
