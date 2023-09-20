import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import CalendarContent from "./CalendarContent";
import Modal from "../Global/Modal/Modal";
import { useEffect, useState } from "react";
import EventCard from "../Event/EventCard";
import LoadComponent from "../LoadComponent/LoadComponent";
import { GET_EVENT_FECHA } from "../../graphql/Event/EventQl";
import { useQuery } from "@apollo/client";
export default function Calendar({ data }) {
  const [openModal, setOpenModal] = useState(false);
  const [dateInfo, setDateInfo] = useState([]);
  const [allEventsCompleted, setAllEventsCompleted] = useState(false);
  const {
    data: dataEvent,
    loading,
    error,
    refetch,
  } = useQuery(GET_EVENT_FECHA, {
    variables: {
      start: dateInfo?.dateStr || null,
    },
  });
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
        title="Mantenimiento"
      >
        <div className="flex flex-col w-full h-full">
          {loading ? (
            <LoadComponent />
          ) : (
            <>
              <div className="flex justify-between mb-8 px-12">
                <h1 className="font-extrabold text-3xl">{dateInfo.dateStr}</h1>

                <button
                  className="bg-green-400 rounded-lg text-white p-2"
                  disabled={allEventsCompleted}
                >
                  Cerrar Dia
                </button>
              </div>
              <div className="w-full grid grid-cols-2 gap-4 px-4  h-auto">
                {dataEvent?.eventPorFecha?.length == 0 ? (
                  <p>No hay Eventos</p>
                ) : (
                  dataEvent?.eventPorFecha?.map((event, index) => (
                    <EventCard
                      key={index}
                      eventInfo={event}
                      dateString={dateInfo.dateStr}
                      refetchData={refetch}
                    />
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
