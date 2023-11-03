import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { getTokensInCookies } from "./features/auth/authCookies";

function DashboardHero() {
  const [data, setData] = useState([]);
  const { accessToken, refreshToken } = getTokensInCookies();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bearertoken = accessToken; // Replace this with your actual bearer token
        const response = await fetch(
          "https://doros-wedding-server.onrender.com/events/1",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearertoken}`, // Fixed the Authorization header format
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
  }, []);

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
