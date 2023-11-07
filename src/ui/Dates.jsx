import { MdStarRate } from "react-icons/md";
import { BsFileEarmarkSpreadsheet, BsCalendarDate } from "react-icons/bs";
import { formatDate } from "../utilities/dateFormatter";

function Dates({ event, date }) {
  return (
    <div>
      <div className="px-8 py-4 border border-gray-500 rounded-md flex gap-8 w-[350px] shadow-lg shadow-gray-200 hover:shadow-none transition-all">
        <BsCalendarDate size={40} />
        <div className="flex flex-col justify-start items-start">
          <span className="text-[20px] font-bold text-gray-900">{event}</span>
          <span className="flex justify-center items-center gap-2 text-gray-500">
            <MdStarRate />
            {formatDate(date)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Dates;
