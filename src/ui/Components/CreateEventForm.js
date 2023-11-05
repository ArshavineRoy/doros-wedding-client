import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getTokensInCookies } from "../features/auth/authCookies";
import { useNavigate } from "react-router-dom";

const CreateEventForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { accessToken } = getTokensInCookies();
  const navigate = useNavigate();

  // event types in case we want to add more: remove default "wedding" in eventData state
  const event_types = [
    { name: "Wedding" },
    // { name: "Birthday" },
    // { name: "Anniversary" },
    // { name: "Graduation" },
    // { name: "Other" },
  ];

  //cloudinary
  const cloudinryRef = useRef();
  const widgetRef = useRef();
  const [image_url, setImage_Url] = useState("");

  useEffect(() => {
    cloudinryRef.current = window.cloudinary;

    widgetRef.current = cloudinryRef.current.createUploadWidget(
      {
        cloudName: "drbw0vvg7",
        uploadPreset: "doros-test",
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          setImage_Url(result.info.secure_url);

          // Update the image_url in the eventData state
          setEventData({
            ...eventData,
            image_url: result.info.secure_url.toString(),
          });
        } else {
          // console.log("Error uploading image:", error);
        }
      }
    );
  }, []);


  const [eventData, setEventData] = useState({
    name: "",
    type: "wedding",
    date: "",
    location: "",
    guests: "",
    budget: "",
    spouse_first_name: "",
    spouse_last_name: "",
    image_url: "",
  });

  console.log(eventData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center h-3/4 mt-20 ">
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
              <div className="mb-6">
                <button
                  onClick={() => widgetRef.current.open()}
                  className="bg-blue-400 font-bold py-2 px-4 rounded"
                >
                  Upload Image
                </button>
              </div>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[#592727] mb-2 text-sm font-medium"
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="your event name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="type"
                    className="block text-[#592727] mb-2 text-sm font-medium"
                  >
                    Event Type
                  </label>
                  <select
                    name="type"
                    id="type"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={handleInputChange}
                  >
                    {event_types.map((e_t) => (
                      <option key={e_t.name} value={e_t.name}>
                        {e_t.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="date"
                    className="block text-[#592727] mb-2 text-sm font-medium"
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                    placeholder="mm/dd/yyyy"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-[#592727] mb-2 text-sm font-medium"
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="event location"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="guests"
                    className="block text-[#592727] mb-2 text-sm font-medium"
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="expected number of guests e.g., 100"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="budget"
                    className="block text-[#592727] mb-2 text-sm font-medium"
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="planned total budget e.g., 1000000"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="spouse_first_name"
                    className="block text-[#592727] mb-2 text-sm font-medium"
                  >
                    Spouse First Name
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="your spouse's first name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="spouse_last_name"
                    className="block text-[#592727] mb-2 text-sm font-medium"
                  >
                    Spouse Last Name
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="your spouse's last name"
                    required
                  />
                </div>
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
    </div>
  );
};

export default CreateEventForm;
