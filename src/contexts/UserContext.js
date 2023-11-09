import { createContext, useContext, useEffect, useState } from "react";
import { getTokensInCookies } from "../ui/features/auth/authCookies";
import axios from "axios";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const { accessToken } = getTokensInCookies();

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

  // console.log(`user: `, user ? user.first_name : "Loading");

  return (
    <UserContext.Provider
      value={{
        user: user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("PostContext was used outside of the PostProvider");
  return context;
}

export { UserProvider, useUser };
