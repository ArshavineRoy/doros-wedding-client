import React, { useState } from "react";
import axios from "axios";
import { getTokensInCookies } from "../features/auth/authCookies";
import { useNavigate } from "react-router-dom";

const CreateEventForm = () => {
  const preset_key = "el8jsv3r";
  const cloud_name = "dcqgeggij";
  const [errorMessage, setErrorMessage] = useState("");
  const { accessToken } = getTokensInCookies();
  const navigate = useNavigate();

  const [image_url, setImageUrl] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];
    const imageData = new FormData();
    imageData.append("file", file);
    imageData.append("upload_preset", preset_key);

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        imageData
      )
      .then((res) => setEventData({ ...eventData, image_url: res.data.secure_url }))
      
      
      .catch((error) => console.log(error));
  };
  console.log(image_url)

  // form data

  const [eventData, setEventData] = useState({
    name: "",
    type: "",
    date: "",
    location: "",
    guests: "",
    budget: "",
    spouse_first_name: "",
    spouse_last_name: "",
    image_url: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  console.log(eventData)
    // post request
    try {
      const bearertoken = accessToken;
      const response = await axios.post(
        "https://doros-wedding-server.onrender.com/events",
        eventData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearertoken}`,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        // console.log("Event created:", data);

        setEventData({
          name: "",
          type: "",
          date: "",
          location: "",
          guests: "",
          budget: "",
          spouse_first_name: "",
          spouse_last_name: "",
          image_url: "",
        });
        navigate("/dashboard");
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      setErrorMessage("Error creating event. Please try again.");
    }
  };
  // console.log(eventData)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-start h-3/4 mt-20 ">
      <div className="w-full sm:w-1/2 p-4 mt-2">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-10 text-[#73332d] ">
            Create Event
          </h2>
          <div className="w-full">
            <div className="full-width-hr"></div>{" "}
          </div>

          <div className="border p-4 rounded-lg">
            <form onSubmit={handleSubmit}>
              <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Event name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={eventData.name}
                    onChange={(e) =>
                      setEventData({ ...eventData, name: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John & Doe"
                    required
                  />
                </div>
                <div>
                  <label
                    for="type"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Event Type
                  </label>
                  <input
                    type="text"
                    id="type"
                    value={eventData.type}
                    onChange={(e) =>
                      setEventData({ ...eventData, type: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="i.e. Wedding"
                    required
                  />
                </div>
                <div>
                  <label
                    for="date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={eventData.date}
                    onChange={(e) =>
                      setEventData({ ...eventData, date: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="08-12-2023"
                    required
                  />
                </div>
                <div>
                  <label
                    for="location"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={eventData.location}
                    onChange={(e) =>
                      setEventData({ ...eventData, location: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="i.e. Nairobi"
                    required
                  />
                </div>
                <div>
                  <label
                    for="guests"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Guests
                  </label>
                  <input
                    type="number"
                    id="guests"
                    value={eventData.guests}
                    onChange={(e) =>
                      setEventData({ ...eventData, guests: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="i.e. 20"
                    required
                  />
                </div>
                <div>
                  <label
                    for="budget"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Budget
                  </label>
                  <input
                    type="number"
                    id="budget"
                    value={eventData.budget}
                    onChange={(e) =>
                      setEventData({ ...eventData, budget: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="i.e.20000"
                    required
                  />
                </div>
              </div>
              <div class="mb-6">
                <label
                  for="spouse_first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Husband/Wife's First Name
                </label>
                <input
                  type="text"
                  id="spouse_first_name"
                  value={eventData.spouse_first_name}
                  onChange={(e) =>
                    setEventData({
                      ...eventData,
                      spouse_first_name: e.target.value,
                    })
                  }
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="i.e.Johny/Mellisa"
                  required
                />
              </div>
              <div class="mb-6">
                <label
                  for="spouse_last_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Husband/Wife's Last Name
                </label>
                <input
                  type="text"
                  id="spouse_last_name"
                  value={eventData.spouse_last_name}
                  onChange={(e) =>
                    setEventData({
                      ...eventData,
                      spouse_last_name: e.target.value,
                    })
                  }
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="i.e.Wort/May"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-[#73332d]  text-white font-bold py-2 px-4 rounded mt-6 "
              >
                Create Event
              </button>

              {errorMessage && (
                <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
              )}
            </form>
          </div>
        </div>
      </div>

      {image_url ? (
        <div className="mb-6">
          <label
            for="image_url"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          ></label>
          <img
            src={image_url}
            alt="Uploaded Event Image"
            className="max-w-full"
          />
        </div>
      ) : (
        <div className="mb-6">
          <label
            for="image_url"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Image Upload
          </label>
          <input
            type="file"
            id="image_url"
            onChange={handleFile}
            className="max-w-full h-auto max-h-48 max-w-96"
            required
          />
        </div>
      )}
    </div>
  );
};

export default CreateEventForm;
