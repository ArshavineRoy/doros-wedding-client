import { useState } from "react";
import { IoAddCircleOutline, IoWalletOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { VendorsList } from "../features/Vendors/VendorsList";
import AddVendor from "../features/Vendors/AddVendor";
import { dateCalculator } from "../utilities/datecalc";

export const vendor_categories = [
  { name: "Photographers" },
  { name: "Videographers" },
  { name: "MC" },
  { name: "Bakers" },
  { name: "Gown Designers" },
  { name: "Gown Retailers" },
  { name: "Suit Sellers" },
  { name: "Suit Designers" },
  { name: "Wedding Planners" },
  { name: "Hair" },
  { name: "Makeup" },
  { name: "Sound" },
  { name: "All Inclusive Venues" },
  { name: "Spa" },
  { name: "Caterers" },
  { name: "Deco" },
  { name: "Transportation" },
];

export const fake_vendors = [
  {
    id: 1,
    contactPerson: "Moses Chengo",
    phone: "07111111",
    email: "moses@example.com",
    estimatedCost: "500",
    instagram_account: "mosesc",
    instagram_link: "instagram.com",
    website: "www.instagram.com",
    company: "company 2",
    country: "Kenya",
    city: "Nairobi",
    category: "Videographers",
  },
  {
    id: 2,
    contactPerson: "Martin Lenga",
    phone: "072566132",
    email: "martin@example.com",
    instagram_account: "martow",
    instagram_link: "https://www.instagram.com",
    website: "mmm.com",
    company: "company 1",
    estimatedCost: "750",
    country: "Kenya",
    city: "Mombasa",
    category: "Photographers",
  },
];

function Vendors() {
  const [showWidget, setShowWidget] = useState(true);
  const [showAddVendor, setShowAddVendor] = useState(false);

  function handleShowAddVendorForm() {
    setShowAddVendor(true);
  }

  function handleCloseAddVendor() {
    setShowAddVendor(false);
  }

  function handleYourVendors() {
    setShowWidget(true);
  }

  function handleVendorsList() {
    setShowWidget(false);
  }

  return (
    <div className="border border-gray-300 w-[1300px] h-[800px] mx-auto mb-20 p-8">
      <div className="w-full flex justify-between gap-8 mb-8">
        <di
          className={
            showWidget
              ? "text-2xl flex-1 bg-[#faf6f3] border-b-4 border-[#73332D] w-full cursor-pointer p-4 font-bold hover:bg-[#f8efe7]"
              : "text-2xl flex-1 w-full cursor-pointer p-4  font-bold hover:bg-stone-100"
          }
          onClick={handleYourVendors}
        >
          Your Vendors
        </di>
        <div
          className={
            showWidget === false
              ? "text-2xl flex-1 bg-[#faf6f3] border-b-4 border-[#73332D] w-full cursor-pointer p-4 font-bold hover:bg-[#f8efe7]"
              : " text-2xl flex-1 w-full cursor-pointer p-4  font-bold hover:bg-stone-100"
          }
          onClick={handleVendorsList}
        >
          Vendors List
        </div>
      </div>

      {showWidget && <YourVendors onAddvendor={handleShowAddVendorForm} />}
      {!showWidget && <VendorsList />}

      {showAddVendor && <AddVendor close={handleCloseAddVendor} />}
    </div>
  );
}

function YourVendors({ onAddvendor }) {
  return (
    <div>
      <span className="text-2xl font-semibold">Your Wallet</span>

      <div className="flex justify-between mt-8">
        <div className="w-[500px] border border-stone-300 flex gap-6 p-4">
          <IoWalletOutline size={100} />
          <div className="flex flex-col">
            <span className="text-[30px] font-bold">100,000</span>
            <div className="border-b-2 border-black mb-2"></div>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              iusto natus ipsam necessitatibus
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-evenly">
          <span className="text-lg">Payment Details</span>
          <span className="text-lg">Buy Goods: 580392</span>
          <button className="flex justify-center items-center px-10 py-2 text-white cursor-pointer border-2 bg-[#5f1b15] text-[18px] hover:bg-[#49120d] transition-all hover:text-white">
            Fill Wallet
          </button>
        </div>

        <div className="flex flex-col justify-evenly">
          <button className="flex justify-center items-center px-8 py-4 text-white cursor-pointer border-2 bg-[#5f1b15] text-[18px] hover:bg-[#49120d] transition-all hover:text-white">
            Pay Vendors
          </button>
          <span className="text-lg">Pay your vendor in one click</span>
        </div>
      </div>

      <MyVendorsTable onAddvendor={onAddvendor} />
    </div>
  );
}

function MyVendorsTable({ onAddvendor }) {
  const [vendors, setVendors] = useState(fake_vendors);

  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedVendors = vendors.map((vendor) => ({
      ...vendor,
      checked: !selectAll,
    }));
    setVendors(updatedVendors);
  };

  const handleSingleSelect = (id) => {
    const updatedVendors = vendors.map((vendor) => {
      if (vendor.id === id) {
        return { ...vendor, checked: !vendor.checked };
      }
      return vendor;
    });
    setVendors(updatedVendors);
  };

  return (
    <div className="mt-12">
      <h1 className="text-2xl font-bold text-gray-800 mb-3">My Vendors List</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </th>

            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Company
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Contact Person
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Phone
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Email
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Instagram
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Website
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Estimated Cost
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              City
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {vendors.map((vendor) => (
            <tr key={vendor.id}>
              <td className="px-2 py-2 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={vendor.checked || false}
                  onChange={() => handleSingleSelect(vendor.id)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap">{vendor.company}</td>
              <td className="px-2 py-2 whitespace-nowrap">
                {vendor.contactPerson}
              </td>
              <td className="px-2 py-2 whitespace-nowrap">{vendor.phone}</td>
              <td className="px-2 py-2 whitespace-nowrap">{vendor.email}</td>
              <td className="px-2 py-2 whitespace-nowrap">
                {vendor.instagram_account}
              </td>
              <td className="px-2 py-2 whitespace-nowrap">
                <span className=" text-blue-600">{vendor.website}</span>
              </td>
              <td className="px-2 py-2 whitespace-nowrap">
                {vendor.estimatedCost}
              </td>
              <td className="px-2 py-2 whitespace-nowrap">{vendor.city}</td>
              <td className="px-6 py-4 whitespace-nowrap flex justify-center items-center">
                <div className="flex gap-2 text-gray-600">
                  <RiDeleteBin6Line
                    size={22}
                    className="hover:text-black cursor-pointer"
                  />
                </div>
              </td>
            </tr>
          ))}
          <tr>
            <button
              className="px-1 py-4 flex gap-1 items-center"
              onClick={onAddvendor}
            >
              <IoAddCircleOutline size={18} />
              <span>Add Item</span>
            </button>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Vendors;
