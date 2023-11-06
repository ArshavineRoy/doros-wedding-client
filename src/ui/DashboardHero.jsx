import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { getTokensInCookies } from "./features/auth/authCookies";
import { useParams } from "react-router-dom";

function DashboardHero() {
  const [data, setData] = useState([]);
  const { accessToken, refreshToken } = getTokensInCookies();
  const { eventId } = useParams();


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
    <div className="w-full flex px-36 pt-40 mb-[] pb-20 h-[550px] ">
      <div className="text-[90px] italic basis-3/4 flex flex-row gap-6 space-y-0 font-curly">
        <span className="">{data.name?.split(" ")[0]}</span>
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
