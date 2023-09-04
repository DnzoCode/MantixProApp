import Calendar from "../../Components/Calendar/Calendar";
export default function Event() {
  return (
    <>
      <div className="flex gap-4 ">
        <div className="bg-white p-4 rounded-lg shadow-xl col-span-4 lg:col-span-3 w-full flex justify-strech items-stretch">
          <Calendar />
        </div>
      </div>
    </>
  );
}
