import Modal from "../Modal";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

function EditProgram({ close, programData, event_id, programCategories, editProgram }) {
  const [formData, setFormData] = useState({
    time: "",
    category: "",
    program_item: "",
    durationValue: "",
    durationUnit: "",
    event_id: parseInt(event_id),
  });

  useEffect(() => {
    if (programData) {
      setFormData({
        program_item: programData.program_item,
        time: programData.time,
        category: programData.category,
        durationValue: programData.durationValue,
        durationUnit: programData.durationUnit,
      });
    }
  }, [programData]);

  // Check if programData is defined
  if (!programData) {
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateTime = (time) => {
    // Regular expression to validate the time format with a space (e.g., 8:00 AM)
    const timePattern = /^(0[1-9]|1[0-2]):[0-5][0-9]\s(?:AM|PM)$/i;

    return timePattern.test(time);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { time, durationValue, durationUnit } = formData;

    if (!validateTime(time)) {
      // Display a toast message for incorrect time format
      toast.error("Please enter a valid time format (e.g., 8:00 AM)");
      return;
    }

    if (!durationValue || !durationUnit) {
      // Display a toast message for missing duration fields
      toast.error("Please enter both duration value and select duration unit.");
      return;
    }

    // Combine durationValue and durationUnit into duration field
    const duration = `${durationValue} ${durationUnit}`;

    // Call the editProgram function with the formData
    editProgram({ ...formData, duration });
    toast.success("Edited the program successfully!");
    close();
  };

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
            placeholder="e.g., 8:00 AM"
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
              <option value="">Select</option>
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
            SAVE CHANGES
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

export default EditProgram;
