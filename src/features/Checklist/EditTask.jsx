import Modal from "../../ui/Modal";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { task_categories } from "../../pages/Runsheet";
import { getTokensInCookies } from "../../ui/features/auth/authCookies";

function EditTask({ taskData, close, onSubmit }) {
  const { accessToken, refreshToken } = getTokensInCookies();
  const [formData, setFormData] = useState({
    item: "",
    person: "",
    role: "",
    completed_status: false,
    contact: "",
    durationType: "",
    durationValue: "",
  });

  useEffect(() => {
    if (taskData) {
      setFormData({
        item: taskData.item,
        person: taskData.person,
        role: taskData.role,
        completed_status: taskData.completed_status,
        contact: taskData.contact,
        event_id: taskData.event_id,
        duration: taskData.duration,
      });
    }
  }, [taskData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    const newValue = type === "checkbox" ? checked : value;
  
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: name === "completed_status" ? newValue : value,
      };
  
      // Update duration based on durationValue and durationType
      if (name === "durationValue" || name === "durationType") {
        const { durationValue, durationType, ...rest } = updatedData;
        updatedData.duration = durationValue && durationType ? `${durationValue} ${durationType}` : '';
        return { ...rest, ...updatedData };
      }
  
      return updatedData;
    });
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const bearertoken = accessToken;
      const response = await fetch(
        `https://doros-wedding-server.onrender.com/tasks/${taskData.id}`, // Assuming 'id' exists on the task data
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearertoken}`,
          },
          body: JSON.stringify(updatedTask),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Task updated:", data);
        onSubmit(data);
        toast.success("Task updated successfully!");
        close();
      } else {
        console.error("Failed to update task:", response.status);
        toast.error("Failed to update the task");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating the task");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData) return;

    const { durationValue, durationType, ...updatedFormData } = formData; // Destructuring to exclude durationValue and durationType

    handleUpdateTask(updatedFormData);
    console.log(updatedFormData);
    // toast.success("Task updated successfully!");
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

        <div className="mb-6 flex gap-4">
          <div>
            <label htmlFor="durationValue" className="block font-bold mb-1">
              Duration
            </label>
            <input
              required
              type="number"
              id="durationValue"
              min={0}
              max={30}
              name="durationValue"
              placeholder="Duration Value"
              onChange={handleInputChange}
              className="w-[200px] border-b border-gray-400 p-[4px] focus:outline-none"
            />
          </div>

          <select
            name="durationType"
            id="durationType"
            onChange={handleInputChange}
            value={formData.durationType}
            className="w-1/2 border rounded-md"
          >
            <option value="">Select</option>
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
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
