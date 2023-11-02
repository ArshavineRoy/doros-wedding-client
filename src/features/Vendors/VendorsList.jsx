import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { BsFilter } from "react-icons/bs";
import { fake_vendors, vendor_categories } from "../../pages/Vendors";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../assests/doros.png";

export function VendorsList() {
  const [vendors, setVendors] = useState(fake_vendors);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showCategoryFilters, setCategoryFilters] = useState(false);

  const handleCategoryChange = (category) => {
    let updatedCategories;
    if (selectedCategories.includes(category)) {
      updatedCategories = selectedCategories.filter((cat) => cat !== category);
    } else {
      updatedCategories = [...selectedCategories, category];
    }

    setSelectedCategories(updatedCategories);

    if (updatedCategories.length === 0) {
      setVendors(fake_vendors);
    } else {
      const filteredVendors = fake_vendors.filter((vendor) =>
        updatedCategories.includes(vendor.category)
      );
      setVendors(filteredVendors);
    }
  };

  function handleShowCategoryFilter() {
    setCategoryFilters(true);
  }

  function handleCloseCategoryFilter() {
    setCategoryFilters(false);
  }

  return (
    <>
      <div className="my-10">
        <div className="mb-8">
          <button
            className="border-2 px-4 py-2 border-stone-300 flex gap-2 items-center justify-center"
            onClick={handleShowCategoryFilter}
          >
            <BsFilter />
            <span>Filter</span>
          </button>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
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
                  {vendor.company}
                </td>
                <td className="px-2 py-2 whitespace-nowrap">
                  {vendor.contactPerson}
                </td>
                <td className="px-2 py-2 whitespace-nowrap">{vendor.phone}</td>
                <td className="px-2 py-2 whitespace-nowrap">{vendor.email}</td>
                <td className="px-2 py-2 whitespace-nowrap">
                  {vendor.instagram_account}
                </td>
                <td className="px-2 py-2 whitespace-nowrap">
                  {vendor.website}
                </td>
                <td className="px-2 py-2 whitespace-nowrap">
                  {vendor.estimatedCost}
                </td>
                <td className="px-2 py-2 whitespace-nowrap">{vendor.city}</td>
                <td className="px-6 py-4 whitespace-nowrap flex justify-center items-center">
                  <div className="flex gap-2 text-gray-600">
                    <IoAddCircleOutline
                      size={22}
                      className="hover:text-black cursor-pointer"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCategoryFilters && (
        <div className="fixed left-0 top-0 z-10 h-screen w-full bg-black/70"></div>
      )}

      <div
        className={
          showCategoryFilters
            ? "fixed left-0 top-0 z-10 h-screen w-[300px] bg-white duration-300"
            : "fixed left-[-100%] top-0 z-10 h-screen w-[300px] bg-white duration-300 "
        }
      >
        <AiOutlineClose
          size={28}
          className="absolute right-4 top-4 cursor-pointer"
          onClick={handleCloseCategoryFilter}
        />

        <Logo />

        <div className="px-2 pb-6 text-lg mt-4 flex flex-col gap-2">
          <p>Select a category:</p>
          {vendor_categories.map((category) => (
            <>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  onChange={() => handleCategoryChange(category.name)}
                  checked={selectedCategories.includes(category.name)}
                  className="form-checkbox h-4 w-4 text-blue-700"
                  id={category.name}
                />
                <label className="checkbox-label block" htmlFor={category.name}>
                  {category.name}
                </label>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

function Logo() {
  return (
    <div>
      <img src={logo} alt="logo" className=" w-40" />
    </div>
  );
}

export default Logo;
