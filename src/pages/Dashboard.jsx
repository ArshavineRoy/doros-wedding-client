import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { GrTask } from "react-icons/gr";
import { GiNotebook } from "react-icons/gi";
import { BsFileEarmarkSpreadsheet, BsCalendarDate } from "react-icons/bs";
import venues from "../assests/gazebo.png";
import banquet from "../assests/banquet.png";
import camera from "../assests/camera.png";
import video from "../assests/video.png";
import vinyl from "../assests/vinyl.png";
import weddingarch from "../assests/wedding-arch.png";
import gift from "../assests/gift-box.png";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Dates from "../ui/Dates";
import { getTokensInCookies } from "../ui/features/auth/authCookies";


function Dashboard() {
  const [data, setData] = useState([]);
  const { accessToken, refreshToken } = getTokensInCookies();
  const { eventId } = useParams();

  console.log("Event ID:", eventId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bearertoken = accessToken;
        const response = await fetch(
          `https://doros-wedding-server.onrender.com/events/${eventId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearertoken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Data:", data);
          setData(data);
        } else {
          console.log("Response not OK:", response.status);
        }
      } catch (err) {
        console.log("Error:", err);
      }
    };

    fetchData();
  }, [eventId]);

  return (
    <>
      <div className="flex items-center px-[110px]">
        <div className="flex-1 border-b-2 border-black"></div>
        <div className="px-4 font-bold text-[30px] ">Important Dates</div>
        <div className="flex-1 border-b-2 border-black"></div>
      </div>

      <div className="px-32  grid grid-cols-3 gap-16 py-20">
        <Dates date={data.date} event={"Wedding Date"} />
        <Dates date={data.bachelorette_party} event={"Bachelorette Party"} />
        <Dates date={data.engagement_party} event={"Engagement Party"} />
        <Dates date={data.honeymoon} event={"Honeymoon"} />
      </div>

      <div className="flex items-center px-[110px]">
        <div className="flex-1 border-b-2 border-black"></div>
        <div className="px-4 font-bold text-[30px] ">Planner</div>
        <div className="flex-1 border-b-2 border-black"></div>
      </div>

      <div>
        <div className="flex justify-between items-center px-[110px] py-16 w-full">
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

          <Link to="/dashboard/program">
            <div className="border-2 border-[#73332D] w-[180px] h-[180px] flex flex-col gap-[18px] items-center justify-center shadow-md shadow-[#73332D] hover:shadow-none cursor-pointer hover:translate-y-[-5px] transition-all">
              <BsFileEarmarkSpreadsheet size={30} />
              <div className="flex flex-col text-center">
                <span>Event</span>
                <span>Program</span>
              </div>
            </div>
          </Link>

          <Link to="/dashboard/runsheet">
            <div className="border-2 border-[#73332D] w-[180px] h-[180px] flex flex-col gap-[18px] items-center justify-center shadow-md shadow-[#73332D] hover:shadow-none cursor-pointer hover:translate-y-[-5px] transition-all">
              <GiNotebook size={30} />
              <div className="flex flex-col text-center">
                <span>Wedding</span>
                <span>Day Run sheet</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="px-28">
          <div className="bg-[#e7c3a6] w-full grid pb-12 pt-4 mt-6">
            <div className="">
              <h1 className="text-center pt-4 pb-8 text-[28px] font-semibold">
                Manage Vendors
              </h1>
            </div>

            <div className="grid grid-cols-3 px-20 py-4 gap-20 place-items-center">
              <Link to="/dashboard/vendors">
                <div className="border-2 border-gray-300 bg-white w-[180px] h-[180px] flex flex-col gap-[18px] items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                  <img src={venues} alt="" className="width-[60px] h-[60px]" />
                  <div className="flex flex-col text-center">
                    <span className="font-bold">Events</span>
                  </div>
                </div>
              </Link>

              <div className="border-2 border-gray-300 bg-white w-[180px] h-[180px] flex flex-col gap-[18px] items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                <img src={banquet} alt="" className="width-[60px] h-[60px]" />
                <div className="flex flex-col text-center">
                  <span className="font-bold">Caterer</span>
                </div>
              </div>

              <div className="border-2 border-gray-300 bg-white w-[180px] h-[180px] flex flex-col gap-[18px] items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                <img
                  src={weddingarch}
                  alt=""
                  className="width-[60px] h-[60px]"
                />
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
                  <span className="font-bold">MC</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Link to="/dashboard/vendors">
                <button className="text-2xl p-4">Full List &rarr;</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center mt-14 px-[110px]">
        <div className="flex-1 border-b-2 border-black"></div>
        <div className="px-4 font-bold text-[30px] ">Guests & RSVP</div>
        <div className="flex-1 border-b-2 border-black"></div>
      </div>

      <div>
        <div className="flex justify-between px-32 py-12 gap-[90px] w-full">
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

        <div className="flex justify-center items-center bg-[#5f1b15] text-white w-[200px] mx-auto py-2  cursor-pointer hover:bg-[#49120d]">
          <button className="text-[20px]">START NOW</button>
        </div>
      </div>

      <div className="flex items-center mt-14 px-[110px]">
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

        <div className="flex justify-center items-center bg-[#5f1b15] text-white w-[200px] mx-auto py-2 cursor-pointer hover:bg-[#49120d] mt-12 mb-12">
          <button className="text-[20px]">START HERE</button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
