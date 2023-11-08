import Modal from "../Modal";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

function AddProgram({ close, addProgram, programCategories, eventId }) {
  const [formData, setFormData] = useState({
    time: "",
    category: programCategories[0]?.name || "", 
    program_item: "",
    duration: "",
    event_id: parseInt(eventId),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
            className="w-full border-b border-gray-400 p-2 focus:outline-none"
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
          <label htmlFor="duration" className="block font-bold mb-1">
            Duration
          </label>
          <input
            required
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            className="w-full border-b border-gray-400 p-2 focus:outline-none"
          />
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
