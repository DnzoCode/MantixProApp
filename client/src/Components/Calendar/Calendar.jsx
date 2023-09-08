import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import CalendarContent from "./CalendarContent";
import Modal from "../Global/Modal/Modal";
import { useState } from "react";
import EventCard from "../Event/EventCard";
export default function Calendar({ data }) {
  const [openModal, setOpenModal] = useState(false);
  const [dateInfo, setDateInfo] = useState([]);

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={data.events}
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
        eventContent={(eventInfo) => <CalendarContent eventInfo={eventInfo} />}
        dateClick={(dateInfo) => {
          setOpenModal(true);
          setDateInfo(dateInfo);
        }}
      />
      <Modal
        setOpenModal={setOpenModal}
        isOpen={openModal}
        title="Mantenimiento"
      >
        <div className="flex flex-col w-full ">
          <div className="flex justify-center mb-8">
            <h1 className="font-extrabold text-3xl">{dateInfo.dateStr}</h1>
          </div>
          <div className="w-full grid grid-cols-2 gap-4 px-4  h-auto">
            {data.events.map((event) => (
              <EventCard key={event._id} eventInfo={event} />
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}
