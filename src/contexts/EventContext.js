import { createContext, useContext, useEffect, useState } from "react";
import { getTokensInCookies } from "../ui/features/auth/authCookies";
import axios from "axios";

const EventContext = createContext();

function EventProvider({ children, eventId }) {
  const [eventData, setEventData] = useState();
  const { accessToken, refreshToken } = getTokensInCookies();

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
          //   console.log("Data:", data);
          setEventData(data);
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
    <EventContext.Provider
      value={{
        eventData,
        eventData,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

function useEvent() {
  const context = useContext(EventContext);
  if (context === undefined)
    throw new Error("PostContext was used outside of the PostProvider");
  return context;
}

export { EventProvider, useEvent };
