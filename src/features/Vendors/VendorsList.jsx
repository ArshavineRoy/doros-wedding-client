import { useEffect, useState } from "react";
import { BsFilter } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../assests/doros.png";
import { getTokensInCookies } from "../../ui/features/auth/authCookies";
import { vendor_categories } from "../../pages/Vendors";
import { IoAddCircleOutline } from "react-icons/io5";
import { toast } from "react-hot-toast";

export function VendorsList({ event_id }) {
  const [vendors, setVendors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showCategoryFilters, setCategoryFilters] = useState(false);
  const [allVendors, setAllVendors] = useState([]);

  const { accessToken, refreshToken } = getTokensInCookies();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bearertoken = accessToken; // Replace this with your actual bearer token
        const response = await fetch(
          "https://doros-wedding-server.onrender.com/vendors",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearertoken}`, // Fixed the Authorization header format
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Data:", data);
          setVendors(data);
          setAllVendors(data);
        } else {
          console.log("Response not OK:", response.status);
        }
      } catch (err) {
        console.log("Error:", err);
      }
    };

    fetchData();
  }, []);

  const addVendorToMyList = (selectedVendor) => {
    // console.log("selected vendor: ", selectedVendor.id);
    // console.log("event id: ", parseInt(event_id));
    const bearertoken = accessToken;
    fetch(`https://doros-wedding-server.onrender.com/event_vendors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearertoken}`,
      },
      body: JSON.stringify({
        event_id: event_id,
        vendor_id: selectedVendor.id,
      }),
    })
      .then((response) => {
        // console.log(response.json());
        if (response.ok) {
          // If response is okay (status in the 200-299 range)
          return response; // Assuming the response is JSON
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        console.log("Vendor added successfully", data); // You can display the data received in the response
        toast.success("Vendor was successfully added to your list");
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error("Error adding vendor:", error);
        // Show an error message to the user
        toast.error("Failed to add the vendor added to your list!");
      });
  };

  const handleCategoryChange = (category) => {
    let updatedCategories;
    if (selectedCategories.includes(category)) {
      updatedCategories = selectedCategories.filter((cat) => cat !== category);
    } else {
      updatedCategories = [...selectedCategories, category];
    }
    setSelectedCategories(updatedCategories);

    if (updatedCategories.length === 0) {
      setVendors(allVendors); // Reset vendors to the original list
    } else {
      const filteredVendors = allVendors.filter((vendor) =>
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
        <table className="min-w-full  divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Company
              </th>
              <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Category
              </th>
              <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Phone
              </th>
              <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Socials
              </th>
              <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                City
              </th>

              <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vendors?.map((vendor) => (
              <tr key={vendor.id}>
                <td className="px-1 py-2 whitespace-nowrap">
                  {vendor.company}
                </td>
                <td className="px- py-2 whitespace-nowrap">
                  {vendor.category}
                </td>
                <td className="px-1 py-2">{vendor.phone}</td>
                <td className="px-1 py-2 whitespace-nowrap">{vendor.email}</td>
                <td className="px-1 py-2 whitespace-nowrap">
                  <a
                    href={vendor.website}
                    className="text-blue-500"
                    target="blank"
                  >
                    {vendor.instagram_username === ""
                      ? vendor.website
                      : vendor.instagram_username}
                  </a>
                </td>
                <td className="px-1 py-1 whitespace-nowrap">{vendor.city}</td>

                <td className="px-1 py-1 whitespace-nowrap ">
                  <div className="flex gap-2 text-gray-600 item-center justify-center">
                    <IoAddCircleOutline
                      size={22}
                      className="hover:text-black cursor-pointer"
                      onClick={() => addVendorToMyList(vendor)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCategoryFilters && (
        <div
          className="fixed left-0 top-0 z-10 h-screen w-full bg-black/70"
          onClick={handleCloseCategoryFilter}
        ></div>
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
          {vendor_categories?.map((category) => (
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
