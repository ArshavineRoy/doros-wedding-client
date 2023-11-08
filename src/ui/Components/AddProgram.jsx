import Modal from "../Modal";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

function AddProgram({ close, addProgram, programCategories, eventId }) {
  const [formData, setFormData] = useState({
    time: "",
    category: programCategories[0]?.name || "",
    program_item: "",
    durationValue: "",
    durationUnit: "minutes", // Default unit
    event_id: parseInt(eventId),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateTime = (time) => {
    // Regular expression to validate the time format (e.g., 8:00 AM)
    const timePattern = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;

    return timePattern.test(time);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { time } = formData;

    if (!validateTime(time)) {
      // Display a popup or toast message for incorrect time format
      toast.error("Please enter a valid time format (e.g., 8:00 AM)");
      return;
    }

    if (!formData) return;

    // Call the addProgram function with the formData
    addProgram(formData);
    console.log(formData);

    toast.success("Added a wedding program successfully!");
    close();
  }

  return (
    <Modal close={close}>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4">
        <div className="mb-6">
          <label htmlFor="time" className="block font-bold mb-1">
            Time
          </label>
          <input
            required
            type="text"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            placeholder="e.g., 8:00 AM" // Placeholder for guidance
            className="w-3/4 border-b border-gray-400 p-2 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="category" className="block font-bold mb-1">
            Category
          </label>
          <select
            required
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2"
          >
            <option value="">Select</option>
            {programCategories
              .filter((category) => category.name !== "All")
              .map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="program_item" className="block font-bold mb-1">
            Program Item
          </label>
          <input
            required
            type="text"
            id="program_item"
            name="program_item"
            value={formData.program_item}
            onChange={handleInputChange}
            className="w-full border-b border-gray-400 p-2 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="durationValue" className="block font-bold mb-1">
            Duration
          </label>
          <div className="flex">
            <input
              required
              type="text"
              id="durationValue"
              name="durationValue"
              value={formData.durationValue}
              onChange={handleInputChange}
              placeholder="Enter duration value"
              className="w-3/4 border-b border-gray-400 p-2 focus:outline-none"
            />
            <select
      required
      id="durationUnit"
      name="durationUnit"
      value={formData.durationUnit}
      onChange={handleInputChange}
      className="w-1/4 border rounded-md p-2 ml-2"
    >
      <option value="minutes">Minutes</option>
      <option value="hours">Hours</option>
    </select>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="flex justify-center items-center px-8 py-4 text-white cursor-pointer border-2 bg-[#5f1b15] text-[18px] hover:bg-[#49120d] transition-all hover:text-white"
          >
            ADD PROGRAM
          </button>

          <button
            className="flex justify-center items-center px-8 py-4 text-white cursor-pointer border-2 bg-[#5f1b15] text-[18px] hover:bg-[#49120d] transition-all hover:text-white"
            onClick={close}
          >
            CANCEL
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddProgram;
