import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { getTokensInCookies } from "./features/auth/authCookies";
import { useParams } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function DashboardHero() {
  const [data, setData] = useState([]);
  const { accessToken, refreshToken } = getTokensInCookies();
  const { eventId } = useParams();
  const { user } = useUser();

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
  }, [eventId, accessToken, refreshToken]);

  return (
    <div className="w-full px-12 flex flex-col md:px-6 lg:px-48 pt-36 md:flex-row md:justify-between  md:pt-40 pb-36 h-full md:h-[550px] ">
      <div className="text-[45px] font-bold md:text-[60px] lg:text-[90px] italic basis-3/4 flex flex-row gap-6 space-y-0 font-curly">
        <span className="">{user?.first_name}</span>
        <span className="py-[60px]">+</span>
        <span className="py-[120px]">{data.spouse_first_name}</span>
      </div>
      <div>
        <img
          src={data.image_url}
          alt=""
          className=" object-contain w-[300px] h-[350px] rotate-12 basis-1/4"
        />
        <FiEdit size={20} className="cursor-pointer" />
      </div>
    </div>
  );
}

export default DashboardHero;
