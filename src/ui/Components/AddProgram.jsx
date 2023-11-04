import Modal from "../../ui/Modal";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

function AddProgram({ close, addProgram, programCategories }) {
  const [formData, setFormData] = useState({
    time: "",
    category: programCategories[0] || "", // Initialize with the first category or an empty string
    program_item: "",
    duration: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getProgramItemsForCategory = (category) => {
    switch (category) {
      case "Brides & Bridesmaids' Preparation":
        return [
          "Bridal Makeup",
          "Bridesmaids' Hairstyling",
          "Wedding Dress Fitting",
          "Accessories Selection",
        ];
      case "Bride & Bridesmaids' Breakfast & Photoshoot":
        return [
          "Breakfast at a Cafe",
          "Outdoor Photoshoot",
          "Indoor Photoshoot",
          "Dressing Up",
        ];
      case "Groom & Groomsmen's Preparation":
        return [
          "Groom's Suiting",
          "Groomsmen's Ties",
          "Haircut & Shaving",
          "Final Suit Fitting",
        ];
      case "Wedding Ceremony":
        return [
          "Walk Down the Aisle",
          "Exchanging Vows",
          "Ring Exchange",
          "Unity Ceremony",
        ];
      case "Wedding Reception":
        return [
          "Welcome Drinks",
          "Dinner Buffet",
          "Cake Cutting",
          "First Dance",
        ];
      default:
        return [];
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData) return;

    addProgram(formData);

    toast.success("Added a wedding program successfully!");
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
            {programCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="program_item" className="block font-bold mb-1">
            Program Item
          </label>
          <select
            required
            id="program_item"
            name="program_item"
            value={formData.program_item}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2"
          >
            {getProgramItemsForCategory(formData.category).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
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
