import Modal from "../../ui/Modal";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { task_categories } from "../../pages/Runsheet";

function AddTask({ close, addTask, event_id }) {
  const [formData, setFormData] = useState({
    item: "",
    person: "",
    role: "",
    completed_status: false,
    contact: "",
    event_id: event_id,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData) return;

    addTask(formData);
    toast.success("Added a wedding task successfully!");
    // console.log(formData);
    console.log(`formData`, formData);

    close();
  };

  return (
    <Modal close={close}>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4">
        <div className="mb-6">
          <label htmlFor="item" className="block font-bold mb-1">
            Item
          </label>
          <input
            required
            type="text"
            id="item"
            name="item"
            value={formData.item}
            onChange={handleInputChange}
            className="w-full border-b border-gray-400 p-[4px] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="person" className="block font-bold mb-1">
            Person
          </label>
          <input
            required
            type="text"
            id="person"
            name="person"
            value={formData.person}
            onChange={handleInputChange}
            className="w-full border-b border-gray-400 p-[4px] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="role" className="block font-bold mb-1">
            Person Incharge
          </label>
          <select
            name="role"
            id="role"
            className="w-full border rounded-md p-2"
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            {task_categories.map((category) => (
              <>
                <option value={category.name}>{category.name}</option>
              </>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="contact" className="block font-bold mb-1">
            Contact
          </label>
          <input
            required
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            className="w-full border-b border-gray-400 p-[4px] focus:outline-none"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit" // This button submits the form
            className="flex justify-center items-center px-8 py-4 text-white cursor-pointer border-2 bg-[#5f1b15] text-[18px] hover:bg-[#49120d] transition-all hover:text-white"
          >
            ADD ITEM
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

export default AddTask;
