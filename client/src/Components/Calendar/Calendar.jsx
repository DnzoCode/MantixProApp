import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import CalendarContent from "./CalendarContent";
import Modal from "../Global/Modal/Modal";
import { useState } from "react";
import EventCard from "../Event/EventCard";
export default function Calendar() {
  const events = [
    {
      id: 1,
      title: "Evento 1",
      start: "2023-09-05T10:00:00",
      end: "2023-09-05T12:00:00",
      description: "Descripción del evento 1",
    },
    {
      id: 2,
      title: "Evento 2",
      start: "2023-09-06T14:00:00",
      end: "2023-09-06T16:00:00",
      description: "Descripción del evento 2",
    },
    // Agrega más eventos aquí
  ];

  const [openModal, setOpenModal] = useState(false);
  const [dateInfo, setDateInfo] = useState([]);

  console.log(dateInfo.dateStr);
  return (
    <>
      <div className="w-full">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={events}
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
          eventContent={(eventInfo) => (
            <CalendarContent eventInfo={eventInfo} />
          )}
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
              <EventCard />
              <EventCard />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
