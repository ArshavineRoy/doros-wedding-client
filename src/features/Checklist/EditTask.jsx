import Modal from "../../ui/Modal";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { task_categories } from "../../pages/Runsheet";

function EditTask({ taskData, close, onSubmit }) {
  const [formData, setFormData] = useState({
    item: "",
    person: "",
    role: "",
    completed_status: false,
    contact: "",
  });

  useEffect(() => {
    if (taskData) {
      setFormData({
        item: taskData.item,
        person: taskData.person,
        role: taskData.role,
        completed_status: taskData.completed_status,
        contact: taskData.contact,
      });
    }
  }, [taskData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData) return;

    onSubmit(formData);
    toast.success("Task updated successfully!");
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

        <div className="mb-6 flex gap-3">
          <label htmlFor="completed_status" className="block font-bold mb-1">
            Completed Status:
          </label>
          <input
            type="checkbox"
            id="completed_status"
            name="completed_status"
            checked={formData.completed_status}
            onChange={handleInputChange}
            className="form-checkbox h-5 w-5 text-green-700"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="role" className="block font-bold mb-1">
            Person Incharge
          </label>
          <select
            name="role"
            id="role"
            value={formData.role}
            className="w-full border rounded-md p-2"
            onChange={handleInputChange}
          >
            {task_categories.map((category) => (
              <>
                <option value={category.name}>{category.name}</option>
              </>
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

        <div className="flex justify-between">
          <button className="flex justify-center items-center px-8 py-4 text-white cursor-pointer border-2 bg-[#5f1b15] text-[18px] hover:bg-[#49120d] transition-all hover:text-white">
            UPDATE ITEM
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

export default EditTask;
