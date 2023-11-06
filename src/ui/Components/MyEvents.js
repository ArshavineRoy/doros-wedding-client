import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getTokensInCookies } from '../features/auth/authCookies';

const MyEvents = () => {
  const navigate = useNavigate();
  const [userEvents, setUserEvents] = useState([]);
  const { accessToken } = getTokensInCookies();

  const handleNavigate = () => {
    navigate('/events');
  };

  const bearertoken = accessToken;

  // Authorization
  const config = {
    headers: {
      Authorization: `Bearer ${bearertoken}`,
    },
  };

  useEffect(() => {
    // user's events
    axios
      .get('https://doros-wedding-server.onrender.com/events', config)
      .then((response) => {
        setUserEvents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user events:', error);
      });
  }, []);

  return (
    <div>
      <div className="w-full bg-white-200 p-6 text-2xl flex mt-20">
        <h1 className="text-left text-[#592727] text-2xl">My Events</h1>
        {userEvents.length === 0 ? (
          <button
            className="rounded-lg ml-auto bg-[#73332d] text-white w-40 h-12 text-base"
            onClick={handleNavigate}
          >
            Create Event
          </button>
        ) : null}
      </div>
      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />

      {userEvents.length > 0 ? (
        <div className="w-full bg-white-200 p-6 text-base flex justify-center">
          {/*users info */}
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-[#592727] border-r border-t">Event Name</th>
                <th className="px-4 py-2 text-left text-[#592727] border-r border-t">Type</th>
                <th className="px-4 py-2 text-left text-[#592727] border-r border-t">Date</th>
                <th className="px-4 py-2 text-left text-[#592727] border-r border-t">Location</th>
                <th className="px-4 py-2 text-left text-[#592727] border-r border-t">Guests</th>
                <th className="px-4 py-2 text-left text-[#592727] border-r border-t">Budget</th>
                <th className="px-4 py-2 text-left text-[#592727] border-r border-t">Spouse First Name</th>
                <th className="px-4 py-2 text-left text-[#592727] border-t">Spouse Last Name</th>
              </tr>
            </thead>
            <tbody>
              {userEvents.map((event) => (
                <tr key={event.id} className="border-b">
                  <td className="px-4 py-2 border-r">{event.name}</td>
                  <td className="px-4 py-2 border-r">{event.type}</td>
                  <td className="px-4 py-2 border-r">{event.date}</td>
                  <td className="px-4 py-2 border-r">{event.location}</td>
                  <td className="px-4 py-2 border-r">{event.guests}</td>
                  <td className="px-4 py-2 border-r">{event.budget}</td>
                  <td className="px-4 py-2 border-r">{event.spouse_first_name}</td>
                  <td className="px-4 py-2">{event.spouse_last_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-full bg-white-200 p-6 text-4xl flex justify-center">
          <p className="text-center mt-20">You do not have any events yet. Kindly create one to start.</p>
        </div>
      )}
    </div>
  );
};

export default MyEvents;
