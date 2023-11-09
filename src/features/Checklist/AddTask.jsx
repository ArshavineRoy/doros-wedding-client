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
    durationType: "",
    durationValue: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "durationValue" || name === "durationType") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        duration: `${prevData.durationValue} ${prevData.durationType}`,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData) return;

    const { item, person, role, completed_status, contact } = formData;
    const duration =
      formData.durationValue && formData.durationType
        ? `${formData.durationValue} ${formData.durationType}`
        : "";

    const updatedFormData = {
      item,
      person,
      role,
      completed_status,
      contact,
      duration,
      event_id: parseInt(event_id),
    };

    // console.log(updatedFormData);
    // toast.success("Added a wedding task successfully!");
    addTask(updatedFormData);

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
            Role
          </label>
          <select
            name="role"
            id="role"
            className="w-full border rounded-md p-2"
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            {task_categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="contact" className="block font-bold mb-1">
            Contact Info
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

        <div className="mb-6">
          <label htmlFor="duration" className="block font-bold mb-1">
            Duration
          </label>
          <div className="flex gap-2">
            <input
              required
              type="number"
              id="durationValue"
              min={0}
              max={30}
              name="durationValue"
              placeholder="Duration Value"
              value={formData.durationValue}
              onChange={handleInputChange}
              className="w-[200px] border-b border-gray-400 p-[4px] focus:outline-none"
            />
            <select
              name="durationType"
              id="durationType"
              className="w-1/2 border rounded-md p-2"
              onChange={handleInputChange}
              value={formData.durationType}
            >
              <option value="">Select</option>
              <option value="Days">Days</option>
              <option value="Weeks">Weeks</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
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
