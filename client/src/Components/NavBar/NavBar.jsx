import { BiCalendar } from "react-icons/bi";
export default function NavBar() {
  return (
    <>
      <div className="w-full flex justify-between items-center">
        <h1>Dashboard</h1>
        <div className="flex items-center justify-end">
          <BiCalendar className="text-2xl" />
        </div>
      </div>
    </>
  );
}
