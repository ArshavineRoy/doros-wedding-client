import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { GrTask } from "react-icons/gr";
import { GiNotebook } from "react-icons/gi";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import venues from "../assests/gazebo.png";
import banquet from "../assests/banquet.png";
import camera from "../assests/camera.png";
import video from "../assests/video.png";
import vinyl from "../assests/vinyl.png";
import weddingarch from "../assests/wedding-arch.png";
import gift from "../assests/gift-box.png";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <div className="flex items-center">
        <div className="flex-1 border-b-2 border-black"></div>
        <div className="px-4 font-bold text-[30px] ">Planner</div>
        <div className="flex-1 border-b-2 border-black"></div>
      </div>

      <div className=" px-32">
        <div className="grid grid-cols-4 gap-10 py-16 w-full">
          <div className="border-2 border-[#73332D] w-[180px] h-[180px] flex flex-col gap-[18px] items-center justify-center shadow-md shadow-[#73332D] hover:shadow-none cursor-pointer hover:translate-y-[-5px] transition-all">
            <RiMoneyDollarBoxLine size={30} />
            <div className="flex flex-col text-center">
              <span>Budget</span>
              <span>Calculator</span>
            </div>
          </div>

          <Link to="/dashboard/checklist">
            <div className="border-2 border-[#73332D] w-[180px] h-[180px] flex flex-col gap-[18px] items-center justify-center shadow-md shadow-[#73332D] hover:shadow-none cursor-pointer hover:translate-y-[-5px] transition-all">
              <GrTask size={30} />
              <div className="flex flex-col text-center">
                <span>Wedding</span>
                <span>Task</span>
              </div>
            </div>
          </Link>

          <div className="border-2 border-[#73332D] w-[180px] h-[180px] flex flex-col gap-[18px] items-center justify-center shadow-md shadow-[#73332D] hover:shadow-none cursor-pointer hover:translate-y-[-5px] transition-all">
            <BsFileEarmarkSpreadsheet size={30} />
            <div className="flex flex-col text-center">
              <span>Event</span>
              <span>Program</span>
            </div>
          </div>

          <div className="border-2 border-[#73332D] w-[180px] h-[180px] flex flex-col gap-[18px] items-center justify-center shadow-md shadow-[#73332D] hover:shadow-none cursor-pointer hover:translate-y-[-5px] transition-all">
            <GiNotebook size={30} />
            <div className="flex flex-col text-center">
              <span>Wedding</span>
              <span>Day Runsheet</span>
            </div>
          </div>
        </div>

        <div className="bg-[#e7c3a6] w-full grid pb-12 pt-4 mt-6">
          <h1 className="text-center pt-4 pb-8 text-[28px] font-semibold">
            Manage Venders
          </h1>

          <div className="grid grid-cols-3 px-20 py-4 gap-20 place-items-center">
            <div className="border-2 border-gray-300 bg-white w-[180px] h-[180px] flex flex-col gap-[18px] items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
              <img src={venues} alt="" className="width-[60px] h-[60px]" />
              <div className="flex flex-col text-center">
                <span className="font-bold">Events</span>
              </div>
            </div>

            <div className="border-2 border-gray-300 bg-white w-[180px] h-[180px] flex flex-col gap-[18px] items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
              <img src={banquet} alt="" className="width-[60px] h-[60px]" />
              <div className="flex flex-col text-center">
                <span className="font-bold">Events</span>
              </div>
            </div>

            <div className="border-2 border-gray-300 bg-white w-[180px] h-[180px] flex flex-col gap-[18px] items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
              <img src={weddingarch} alt="" className="width-[60px] h-[60px]" />
              <div className="flex flex-col text-center">
                <span className="font-bold">Events</span>
              </div>
            </div>

            <div className="border-2 border-gray-300 bg-white w-[180px] h-[180px] flex flex-col gap-[18px] items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
              <img src={camera} alt="" className="width-[60px] h-[60px]" />
              <div className="flex flex-col text-center">
                <span className="font-bold">Photographer</span>
              </div>
            </div>

            <div className="border-2 border-gray-300 bg-white w-[180px] h-[180px] flex flex-col gap-[18px] items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
              <img src={video} alt="" className="width-[60px] h-[60px]" />
              <div className="flex flex-col text-center">
                <span className="font-bold">Videographer</span>
              </div>
            </div>

            <div className="border-2 border-gray-300 bg-white w-[180px] h-[180px] flex flex-col gap-[18px] items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
              <img src={vinyl} alt="" className="width-[60px] h-[60px]" />
              <div className="flex flex-col text-center">
                <span className="font-bold">DJ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center  mt-14">
        <div className="flex-1 border-b-2 border-black"></div>
        <div className="px-4 font-bold text-[30px] ">Guests & RSVP</div>
        <div className="flex-1 border-b-2 border-black"></div>
      </div>

      <div>
        <div className="flex px-32 py-12 gap-[90px] w-full">
          <div className="border-2 border-gray-400 py-4 px-4 flex gap-4">
            <img src={venues} alt="" className="h-[30px]" />
            <div>
              <p>Confirmed guests</p>
              <span>250</span>
            </div>
          </div>

          <div className="border-2 border-gray-400 py-4 px-4 flex gap-4">
            <img src={venues} alt="" className="h-[30px]" />
            <div>
              <p>Confirmed guests</p>
              <span>250</span>
            </div>
          </div>

          <div className="border-2 border-gray-400 py-4 px-4 flex gap-4">
            <img src={venues} alt="" className="h-[30px]" />
            <div>
              <p>Confirmed guests</p>
              <span>250</span>
            </div>
          </div>

          <div className="border-2 border-gray-400 py-4 px-4 flex gap-4">
            <img src={venues} alt="" className="h-[30px]" />
            <div>
              <p>Confirmed guests</p>
              <span>250</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center items-center bg-[#5f1b15] text-white w-[200px] mx-auto py-2 w-60 cursor-pointer hover:bg-[#49120d]">
          <button className="text-[20px]">START NOW</button>
        </div>
      </div>

      <div className="flex items-center  mt-14">
        <div className="flex-1 border-b-2 border-black"></div>
        <div className="px-4 font-bold text-[30px] ">Registry</div>
        <div className="flex-1 border-b-2 border-black"></div>
      </div>

      <div className="px-32 mt-16">
        <div className="bg-[#6d889e] w-full pb-12 p-20 mt-6 flex justify-center items-center px-20 gap-20">
          <img src={gift} alt="" className="h-[100px]" />
          <div className=" text-lg">
            <p>Lorem ipsum</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
              beatae dicta repudiandae, expedita ab quas commodi non ipsam iusto
              facere, totam nesciunt voluptate maiores ullam?
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center items-center bg-[#5f1b15] text-white w-[200px] mx-auto py-2 w-60 cursor-pointer hover:bg-[#49120d] mt-12 mb-12">
          <button className="text-[20px]">START HERE</button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
