import { useState, useEffect } from "react";
import { getTokensInCookies } from "../ui/features/auth/authCookies";
import axios from "axios";

export const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  const { accessToken } = getTokensInCookies();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bearertoken = accessToken;
        const response = await axios.get(
          `https://doros-wedding-server.onrender.com/user`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearertoken}`,
            },
          }
        );

        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.log("Response not OK:", response.status);
        }
      } catch (err) {
        console.log("Error:", err);
      }
    };

    fetchData();
  }, [accessToken]);

  console.log(`user: `, user ? user.first_name : "Loading");

  return user;
};
