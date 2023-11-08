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
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Dates from "../ui/Dates";
import { getTokensInCookies } from "../ui/features/auth/authCookies";
import ImportantDatesForm from "../ui/Components/ImportantDatesForm";
import { date } from "yup";

function Dashboard() {
  const [data, setData] = useState([]);
  const [showDateForm, setFormDate] = useState(false);
  const { accessToken, refreshToken } = getTokensInCookies();
  const { eventId } = useParams();

  const navigate = useNavigate();

  console.log("Event ID:", eventId);

  function handleShowDateForm() {
    setFormDate(true);
  }

  function handleHideDateForm() {
    setFormDate(false);
  }

  function handleNavigation() {
    if (data?.payment_status) {
      navigate("/pay");
    }
  }

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
          setData(data);
        } else {
          console.log("Response not OK:", response.status);
        }
      } catch (err) {
        console.log("Error:", err);
      }
    };

    fetchData();
  }, [eventId, accessToken, refreshToken, data]);

  return (
    <>
      <div className="flex items-center px-0 md:px-[110px]">
        <div className="flex-1 border-b-2 border-black"></div>
        <div className="px-4 font-bold text-[24px] md:text-[30px]">
          Important dates
        </div>
        <div className="flex-1 border-b-2 border-black"></div>
      </div>

      <div className="flex justify-center items-center bg-[#5f1b15] text-white w-[170px] mx-auto py-[12px] mt-8 mb-0 cursor-pointer hover:bg-[#49120d]">
        <button className="text-[16px]" onClick={handleShowDateForm}>
          Add Date
        </button>
      </div>

      {showDateForm && (
        <ImportantDatesForm
          close={handleHideDateForm}
          eventData={data}
          event_id={eventId}
        />
      )}

      <div className="flex flex-col px-[20px] md:grid md:grid-cols-2 md:px-12 lg:px-32 lg:grid lg:grid-cols-3 gap-16 py-8">
        {data.date && <Dates date={data.date} event={"Wedding Date"} />}
        {data.bachelorette_party && (
          <Dates date={data.bachelorette_party} event={"Bachelorette Party"} />
        )}
        {data.engagement_party && (
          <Dates date={data.engagement_party} event={"Engagement Party"} />
        )}
        {data.honeymoon && <Dates date={data.honeymoon} event={"Honeymoon"} />}
        {data.traditional_wedding && (
          <Dates
            date={data.traditional_wedding}
            event={"Traditional Wedding"}
          />
        )}
        {data.bachelor_party && (
          <Dates date={data.bachelor_party} event={"Bachelor Party"} />
        )}
      </div>

      <div className="flex items-center px-0 md:px-[110px]">
        <div className="flex-1 border-b-2 border-black"></div>
        <div className="px-4 font-bold text-[24px] md:text-[30px]">Planner</div>
        <div className="flex-1 border-b-2 border-black"></div>
      </div>

      <div>
        <div className="grid grid-cols-2 gap-[50px] md:grid md:grid-cols-2 md:px-40 lg:flex lg:justify-between lg:gap-1 items-center pl-[20px] lg:px-[110px] py-16 w-full">
          <Link
            to={data?.payment_status ? `/dashboard/${eventId}/budget` : "/pay"}
          >
            <div className="w-[140px] h-[140px] border-2 border-[#73332D] lg:w-[180px] lg:h-[180px] flex flex-col gap-[18px] items-center justify-center shadow-md shadow-[#73332D] hover:shadow-none cursor-pointer hover:translate-y-[-5px] transition-all">
              <RiMoneyDollarBoxLine size={30} />
              <div className="flex flex-col text-center">
                <span>Budget</span>
                <span>Calculator</span>
              </div>
            </div>
          </Link>

          <Link
            to={
              data?.payment_status ? `/dashboard/${eventId}/checklist` : "/pay"
            }
          >
            <div className="w-[140px] h-[140px] border-2 border-[#73332D] lg:w-[180px] lg:h-[180px] flex flex-col gap-[18px] items-center justify-center shadow-lg shadow-[#73332D] hover:shadow-none cursor-pointer hover:translate-y-[-5px] transition-all">
              <GrTask size={30} />
              <div className="flex flex-col text-center">
                <span>Wedding</span>
                <span>Task</span>
              </div>
            </div>
          </Link>

          <Link
            to={
              data?.payment_status ? `/dashboard/${eventId}/programs` : "/pay"
            }
          >
            <div className="w-[140px] h-[140px] border-2 border-[#73332D] lg:w-[180px] lg:h-[180px] flex flex-col gap-[18px] items-center justify-center shadow-lg shadow-[#73332D] hover:shadow-none cursor-pointer hover:translate-y-[-5px] transition-all">
              <BsFileEarmarkSpreadsheet size={30} />
              <div className="flex flex-col text-center">
                <span>Event</span>
                <span>Program</span>
              </div>
            </div>
          </Link>

          <Link
            to={
              data?.payment_status ? `/dashboard/${eventId}/runsheet` : "/pay"
            }
          >
            <div className="w-[140px] h-[140px] border-2 border-[#73332D] lg:w-[180px] lg:h-[180px] flex flex-col gap-[18px] items-center justify-center shadow-lg shadow-[#73332D] hover:shadow-none cursor-pointer hover:translate-y-[-5px] transition-all">
              <GiNotebook size={30} />
              <div className="flex flex-col text-center">
                <span>Wedding</span>
                <span>Day Run sheet</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="p-2 ml-2 lg:ml-0 lg:px-28">
          <div className="bg-[#e7c3a6] w-full grid pb-12 pt-4 mt-6">
            <div className="">
              <h1 className="text-center pt-4 pb-8 text-[22px] lg:text-[28px] font-semibold">
                Manage Vendors
              </h1>
            </div>

            <div className="grid grid-cols-3 px-10 py-4 gap-12 lg:px-20 lg:py-4 lg:gap-20 place-items-center">
              <div className="flex flex-col border-2 border-gray-300 bg-white w-[100px] h-[100px] lg:w-[180px] lg:h-[180px] gap-[10px] items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                <img
                  src={venues}
                  alt=""
                  className=" max-w-[35%] lg:max-w-[50%]"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-sm lg:text-lg">Events</span>
                </div>
              </div>

              <div className="flex flex-col border-2 border-gray-300 bg-white w-[100px] h-[100px] lg:w-[180px] lg:h-[180px] gap-[10px] items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                <img
                  src={banquet}
                  alt=""
                  className=" max-w-[35%] lg:max-w-[50%]"
                />
                <div className="flex flex-col lg:text-center">
                  <span className="font-bold text-sm lg:text-lg">Caterer</span>
                </div>
              </div>

              <div className="flex flex-col border-2 border-gray-300 bg-white w-[100px] h-[100px] lg:w-[180px] lg:h-[180px] gap-[10px] items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                <img
                  src={weddingarch}
                  alt=""
                  className=" max-w-[35%] lg:max-w-[50%]"
                />
                <div className="flex flex-col lg:text-center">
                  <span className="font-bold text-sm lg:text-lg">Events</span>
                </div>
              </div>

              <div className="flex flex-col border-2 border-gray-300 bg-white w-[100px] h-[100px] lg:w-[180px] lg:h-[180px] gap-[10px] items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                <img
                  src={camera}
                  alt=""
                  className=" max-w-[35%] lg:max-w-[50%]"
                />
                <div className="flex flex-col lg:text-center">
                  <span className="font-bold text-[12px] lg:text-lg">
                    Photographer
                  </span>
                </div>
              </div>

              <div className="flex flex-col border-2 border-gray-300 bg-white w-[100px] h-[100px] lg:w-[180px] lg:h-[180px] gap-[10px] items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                <img
                  src={video}
                  alt=""
                  className=" max-w-[35%] lg:max-w-[50%]"
                />
                <div className="flex flex-col lg:text-center">
                  <span className="font-bold text-[12px] lg:text-lg">
                    Videographer
                  </span>
                </div>
              </div>

              <div className="flex flex-col border-2 border-gray-300 bg-white w-[100px] h-[100px] lg:w-[180px] lg:h-[180px] gap-[10px] items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                <img
                  src={vinyl}
                  alt=""
                  className=" max-w-[35%] lg:max-w-[50%]"
                />
                <div className="flex flex-col lg:text-center">
                  <span className="font-bold text-sm md:text-lg">MC</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Link to={`/dashboard/${eventId}/vendors`}>
                <button className="text-xl lg:text-2xl p-4">
                  Full List &rarr;
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center mt-8 md:mt-2 px-0 md:px-[110px]">
        <div className="flex-1 border-b-2 border-black"></div>
        <div className="px-4 font-bold text-[24px] md:text-[30px]">
          Guests & RSVP
        </div>
        <div className="flex-1 border-b-2 border-black"></div>
      </div>

      <div>
        <div className="flex flex-col gap-[30px] px-4 lg:flex-row lg:justify-between lg:px-32 py-12 lg:gap-[90px] w-full">
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

        <div className="flex justify-center items-center bg-[#5f1b15] text-white w-[200px] mx-auto py-2  cursor-pointer hover:bg-[#49120d] mb-12">
          <button className="text-[20px]">START NOW</button>
        </div>
      </div>

      <div className="flex items-center px-0 md:px-[110px]">
        <div className="flex-1 border-b-2 border-black"></div>
        <div className="px-4 font-bold text-[24px] md:text-[30px]">
          Registry
        </div>
        <div className="flex-1 border-b-2 border-black"></div>
      </div>

      <div className="px-8 lg:px-32 mt-16">
        <div className="bg-[#6d889e] w-full pb-12 p-20 mt-6 flex flex-col md:flex-row gap-12 px-10 lg:justify-center lg:px-20 lg:gap-20">
          <img
            src={gift}
            alt=""
            className="h-[100px] lg:h-[100px] items-start object-contain"
          />
          <div className=" text-[16px] lg:text-lg">
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
