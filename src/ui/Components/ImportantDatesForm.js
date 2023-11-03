import React, { useState } from "react";


const ImportantDatesForm = () => {
   
  
    // form data for your PATCH request. Resembles backend column
    const [formData, setFormData] = useState({
        engagement_party: "",
        bachelor_party: "",
        bachelorette_party: "",
        traditional_wedding: "",
        honeymoon: "",
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    //   dispatch(startEvent()); // Dispatch the first action of the user which is to enter details
    //   setErrMsg("");
    }
  
    return (
      <div className="pt-20 dark:bg-[#F7F2EE]">
        {/* {eventData.isLoading && <p>Loading...</p>}
        {eventData.errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {eventSuccess && <p>Event created successful!</p>} */}
        <section className="bg-gray-50 dark:bg-[#F7F2EE]">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-[#592727] md:text-2xl">
                  Important dates for your event
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  action="#"
                  onSubmit={handleSubmit}
                >

                  {/* added in order as they would occur in real life */}

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

                  {/* bachelor_party */}  
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#592727]"
                    >
                      Bachelor Party
                    </label>
                    <input
                      type="date"
                      name="bachelor_party"
                      id="bachelor_party"
                      value={formData.bachelor_party}
                      onChange={(e) =>
                        setFormData({ ...formData, bachelor_party: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
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

                 {/* traditional wedding */}  
                 <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#592727]"
                    >
                      Traditional Wedding (if applicable)
                    </label>
                    <input
                      type="date"
                      name="traditional_wedding"
                      id="traditional_wedding"
                      value={formData.traditional_wedding}
                      onChange={(e) =>
                        setFormData({ ...formData, traditional_wedding: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
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
  
                  <button
                    type="submit"
                    className="w-full text-white bg-[#73332D] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    submit
                  </button>      
  
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };
  
  export default ImportantDatesForm;
  