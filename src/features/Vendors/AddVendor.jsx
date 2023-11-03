import Modal from "../../ui/Modal";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { vendor_categories } from "../../pages/Vendors";

function AddVendor({ close, onAddVendor }) {
  const [formData, setFormData] = useState({
    contact_person: "",
    company: "",
    instagram_username: "",
    estimate_cost: 0,
    website: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    category: "",
  });
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    // Convert estimate_cost to a number if the field name matches
    const numericValue =
      name === "estimate_cost" ? parseInt(inputValue) : inputValue;

    setFormData((prevData) => ({
      ...prevData,
      [name]: numericValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if (!formData) return;
    // onAddVendor(formData);
    // toast.success("Added your vendor successfully!");
    close();
  };

  return (
    <Modal close={close}>
      <form onSubmit={handleSubmit} className="w-[400px] mx-auto mt-8 p-4">
        <div className="mb-6">
          <label htmlFor="contact_person" className="block font-bold mb-1">
            Contact Person
          </label>
          <input
            required
            type="text"
            id="contact_person"
            name="contact_person"
            value={formData.item}
            onChange={handleInputChange}
            className="w-full border-b border-gray-400 p-[4px] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="company" className="block font-bold mb-1">
            Company
          </label>
          <input
            required
            type="text"
            id="company"
            name="company"
            value={formData.item}
            onChange={handleInputChange}
            className="w-full border-b border-gray-400 p-[4px] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="website" className="block font-bold mb-1">
            Website
          </label>
          <input
            required
            type="text"
            id="website"
            name="website"
            value={formData.item}
            onChange={handleInputChange}
            className="w-full border-b border-gray-400 p-[4px] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="instagram_username" className="block font-bold mb-1">
            Instagram Username
          </label>
          <input
            required
            type="text"
            id="instagram_username"
            name="instagram_username"
            value={formData.item}
            onChange={handleInputChange}
            className="w-full border-b border-gray-400 p-[4px] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="phone" className="block font-bold mb-1">
            Phone
          </label>
          <input
            required
            type="text"
            id="phone"
            name="phone"
            value={formData.item}
            onChange={handleInputChange}
            className="w-full border-b border-gray-400 p-[4px] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block font-bold mb-1">
            Email
          </label>
          <input
            required
            type="text"
            id="email"
            name="email"
            value={formData.person}
            onChange={handleInputChange}
            className="w-full border-b border-gray-400 p-[4px] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="country" className="block font-bold mb-1">
            Country
          </label>
          <input
            required
            type="text"
            id="country"
            name="country"
            value={formData.person}
            onChange={handleInputChange}
            className="w-full border-b border-gray-400 p-[4px] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="city" className="block font-bold mb-1">
            City
          </label>
          <input
            required
            type="text"
            id="city"
            name="city"
            value={formData.person}
            onChange={handleInputChange}
            className="w-full border-b border-gray-400 p-[4px] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="estimate_cost" className="block font-bold mb-1">
            Estimate Cost
          </label>
          <input
            required
            type="number"
            id="estimate_cost"
            name="estimate_cost"
            value={formData.person}
            onChange={handleInputChange}
            className="w-full border-b border-gray-400 p-[4px] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="category" className="block font-bold mb-1">
            Category
          </label>
          <select
            name="category"
            id="category"
            className="w-full border rounded-md p-2"
            onChange={handleInputChange}
          >
            {vendor_categories.map((category) => (
              <>
                <option value={category.name}>{category.name}</option>
              </>
            ))}
          </select>
        </div>

        <div className="flex justify-between">
          <button className="flex justify-center items-center px-8 py-4 text-white cursor-pointer border-2 bg-[#5f1b15] text-[18px] hover:bg-[#49120d] transition-all hover:text-white">
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

export default AddVendor;
