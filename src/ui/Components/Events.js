import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  startEvent,
  eventSuccess,
  eventFailure,
} from "../features/auth/authSlicerEvent";
import { useDispatch, useSelector } from "react-redux";
import { selectEvent } from "../features/auth/authSlicerEvent";
import { useEventMutation } from "../features/auth/authMutations";

const EventForm = () => {
  const [eventSuccess, setEeventSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const eventData = useSelector(selectEvent);
  const navigate = useNavigate();
  const [errorMessage, setErrMsg] = useState("");

  const [events] = useEventMutation();

  // {
  //   "name": "string",
  //   "type": "string",
  //   "date": "string",
  //   "location": "string",
  //   "guests": 0,
  //   "budget": "string",
  //   "spouse_first_name": "string",
  //   "spouse_last_name": "string",
  //   "bachelorette_party": "string",
  //   "engagement_party": "string",
  //   "honeymoon": "string",
  //   "image_url": "string"
  // }
  

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    date: "",
    location: "",
    guests: "",
    budget: "",
    guspouse_first_name: "",
    spouse_last_name: "",
    bachelorette_party: "",
    engagement_party: "",
    honeymoon: "",
    image_url: "https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(startEvent()); // Dispatch the first action of the user which is to enter details
    setErrMsg("");

    if (

      !formData.name ||
      !formData.type ||
      !formData.date ||
      !formData.location ||
      !formData.guests ||
      !formData.budget ||
      !formData.guspouse_first_name ||
      !formData.spouse_last_name ||
      !formData.bachelorette_party ||
      !formData.engagement_party ||
      !formData.honeymoon ||
      !formData.image_url
    ) {
      setErrMsg("Please fill in all the fields");
      dispatch(eventFailure("Please fill in the required fields"));
    // } else if (
    //   // !/^[A-Z][a-zA-Z]*$/.test(formData.name || formData.name)
    //   !/^[a-zA-Z]*$/.test(formData.name || formData.name)
    // ) {
    //   setErrMsg("Name must Start with a capital letter");
    //   dispatch(eventFailure("Name must start with a capital letter"));
    // } else if (!validateEmail(formData.email)) {
    //   setErrMsg("Invalid Email Format");
    //   dispatch(eventFailure("Invalid Email Format"));
    // } else if (!validatePassword(formData.password)) {
    //   setErrMsg("Password should be atleast 8 characters");
    //   dispatch(eventFailure("Password should be atleast 8 characters"));
    // } else if (!validatePhonenumber(formData.phone)) {
    //   setErrMsg("Invalid Phone number");
    //   dispatch(eventFailure("Invalid Phone number"));
    } else {
      try {
        // make regestration request using signupMutation
        console.log(`formData: `, formData);
        const result = await events(formData);
        console.log(`Events result: `, result);

        // Registration was successful
        dispatch(eventSuccess());
        setEeventSuccess(true);
        setIsLoading(true);
        navigate("/dashboard"); //change this to appropriate route
      } catch (error) {
        // Registration failed, handle errors
        dispatch(eventFailure(error.message));
        setEeventSuccess(false);
      }
    }
  };

  return (
    <div className="pt-20 dark:bg-[#F7F2EE]">
      {/* {eventData.isLoading && <p>Loading...</p>}
      {eventData.errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {eventSuccess && <p>Event created successful!</p>} */}
      <section className="bg-gray-50 pb-[150px] pt-40 dark:bg-[#F7F2EE]">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Flowbite    
      </a> */}

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-[#592727] md:text-2xl">
                Create an event
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#592727]"
                  >
                    Event name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="enter first name..."
                    required=""
                  />
                </div>

                {/* type */}
                {/* <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#592727]"
                  >
                    Event Type
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="enter first name..."
                    required=""
                  />
                </div> */}

                {/* date */}

                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#592727]"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    name="name"
                    id="name"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required=""
                  />
                </div>
                {/* location */}

                <div>
                  <label
                    htmlFor="location"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#592727]"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="enter event location..."
                    required=""
                  />
                </div>

                {/* guests */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#592727]">
                    Guests
                  </label>
                  <input
                    type="number"
                    name="guests"
                    id="guests"
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({ ...formData, guests: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="enter the expected number of guests..."
                    required=""
                  />
                </div>

                {/* budget */}

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#592727]">
                    Budget
                  </label>
                  <input
                    type="text"
                    name="budget"
                    id="budget"
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="enter the budget..."
                    required=""
                  />
                </div>

                {/* spouse_first_name */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#592727]">
                    Spouse First Name
                  </label>
                  <input

                    type="text"
                    name="spouse_first_name"
                    id="spouse_first_name"
                    value={formData.spouse_first_name}
                    onChange={(e) =>
                      setFormData({ ...formData, spouse_first_name: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="enter the spouse first name..."
                    required=""
                  />
                </div>

                {/* spouse_last_name */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#592727]">
                    Spouse Last Name
                  </label>
                  <input

                    type="text"
                    name="spouse_last_name"
                    id="spouse_last_name"
                    value={formData.spouse_last_name}
                    onChange={(e) =>
                      setFormData({ ...formData, spouse_last_name: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="enter the spouse last name..."
                    required=""
                  />
                </div>

                {/* bachelorette_party */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#592727]">
                    Bachelorette Party
                  </label>
                  <input
                  type="date"
                  name="bachelorette_party"
                  id="bachelorette_party"
                  value={formData.bachelorette_party}
                  onChange={(e) =>
                    setFormData({ ...formData, bachelorette_party: e.target.value })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="enter the date for the bachelorette party..."
                  required=""
                />
                </div>

                {/* engagement_party */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#592727]">
                    Engagement Party
                  </label>
                  <input
                  type="date"
                  name="engagement_party"
                  id="engagement_party"
                  value={formData.engagement_party}
                  onChange={(e) =>
                    setFormData({ ...formData, engagement_party: e.target.value })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="enter the date for the engagement party..."
                  required=""
                />
                </div>

                {/* honeymoon */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#592727]">
                    Honeymoon
                  </label>
                  <input
                  type="date"
                  name="honeymoon"
                  id="honeymoon"
                  value={formData.honeymoon}
                  onChange={(e) =>
                    setFormData({ ...formData, honeymoon: e.target.value })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="enter the date for the honeymoon..."
                  required=""
                />
                </div>

                {/* image_url */}
                {/* <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#592727]">
                    Image Url
                  </label>
                  <input
                  type="text"
                  name="image_url"
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) =>
                    setFormData({ ...formData, image_url: e.target.value })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="enter an image url..."
                  required=""
                />
                </div> */}

                <button
                  type="submit"
                  className="w-full text-white bg-[#73332D] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  submit
                </button>      



                {/* <div>
                  <label
                    htmlFor="lastname"
                    className="block mb-2 text-sm font-medium text-[#592727]"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 dark:text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="enter last name...."
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-[#592727] "
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 dark:text-gray-800 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-[#592727] "
                  >
                    Phone Number
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="254712345678"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-[#592727] "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-[#73332D] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign Up
                </button>
                <p className="text-sm font-light text-gray-800">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-blue-600 hover:underline "
                  >
                    Login here
                  </Link>
                </p> */}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventForm;
