import React from "react";

function CalendarContent({ eventInfo }) {
  console.log(eventInfo.event._def);
  return (
    <>
      <div className="w-full shadow-2xl rounded-lg p-4 bg-white-400 border-2 border-black">
        <span className="whitespace-normal">{eventInfo.event._def.title}</span>
      </div>
    </>
  );
}

export default CalendarContent;
