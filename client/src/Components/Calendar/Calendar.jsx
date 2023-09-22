import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CalendarContent from "./CalendarContent";
import Modal from "../Global/Modal/Modal";
import { useState } from "react";
import EventCard from "../Event/EventCard";
import LoadComponent from "../LoadComponent/LoadComponent";
import { GET_EVENT_FECHA } from "../../graphql/Event/EventQl";
import { useQuery } from "@apollo/client";
import moment from "moment/moment";

export default function Calendar({ data, loading }) {
  const [openModal, setOpenModal] = useState(false);
  const [dateInfo, setDateInfo] = useState([]);
  const [allEventsCompleted, setAllEventsCompleted] = useState(false);
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
          end: "dayGridMonth",
        }}
        handleWindowResize
        eventContent={(eventInfo) => <CalendarContent eventInfo={eventInfo} />}
        dateClick={(dateInfo) => {
          setOpenModal(true);
          setDateInfo(dateInfo);
        }}
        timeZone="UTC"
        buttonText={{
          today: "Hoy",
          month: "Meses",
          week: "Semanas",
          day: "Dia",
          list: "Listado",
        }}
      />
      <Modal
        setOpenModal={setOpenModal}
        isOpen={openModal}
        title="Listado Mantenimientos"
      >
        <div className="flex flex-col w-full h-full">
          {loading ? (
            <LoadComponent />
          ) : (
            <>
              {data.events?.length == 0 || data.events == undefined ? (
                <div className="w-full h-full flex justify-center items-center">
                  <p className="font-bold">
                    No hay mantenimientos para esta fecha
                  </p>
                </div>
              ) : (
                <EventCard
                  eventData={data.events.filter(
                    (event) =>
                      moment(event.start).utc().format("YYYY-MM-DD") ==
                      moment(dateInfo.dateStr).utc().format("YYYY-MM-DD")
                  )}
                  dateString={dateInfo.dateStr}
                />
              )}
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
