import { useEffect, useState } from "react";
import { IoAddCircleOutline, IoWalletOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { VendorsList } from "../features/Vendors/VendorsList";
import AddVendor from "../features/Vendors/AddVendor";
import { getTokensInCookies } from "../ui/features/auth/authCookies";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

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
  const [showWidget, setShowWidget] = useState(false);
  const [showAddVendor, setShowAddVendor] = useState(false);
  const [myVendors, setMyVendors] = useState([]);

  const { accessToken, refreshToken } = getTokensInCookies();

  const { eventId } = useParams();

  const addVendorToBackend = async (newVendorData) => {
    try {
      const bearertoken = accessToken; // Replace this with your actual bearer token
      const response = await fetch(
        "https://doros-wedding-server.onrender.com/vendors",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearertoken}`,
          },
          body: JSON.stringify({
            category: newVendorData.category,
            company: newVendorData.company,
            instagram_username: newVendorData.instagram_username,
            website: newVendorData.website,
            contact_person: newVendorData.contact_person,
            email: newVendorData.email,
            phone: newVendorData.phone,
            estimate_cost: parseInt(newVendorData.estimate_cost), // Assuming the backend expects a number
            city: newVendorData.city,
            country: newVendorData.country,
          }),
        }
      );

      if (response.ok) {
        const addedVendor = await response.json();
        fetch(`https://doros-wedding-server.onrender.com/event_vendors`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearertoken}`,
          },
          body: JSON.stringify({
            event_id: eventId,
            vendor_id: addedVendor.id,
          }),
        });
      } else {
        console.log(
          "Error adding vendor. Server responded with status:",
          response.status
        );
        return null; // Return null if there's an error
      }
    } catch (error) {
      console.log("Error:", error);
      return null; // Return null for any errors
    }
  };

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
    <div className="border border-gray-300 w-[1300px] mx-auto mb-20 p-4">
      <div className="w-full flex flex-col lg:flex-row justify-between gap-8 mb-8">
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

      {showWidget && (
        <YourVendors
          onAddvendor={handleShowAddVendorForm}
          onAddVendor={addVendorToBackend}
          vendors={myVendors}
          setMyVendors={setMyVendors}
          event_id={eventId}
          accessToken={accessToken}
        />
      )}

      {!showWidget && <VendorsList event_id={eventId} />}

      {showAddVendor && (
        <AddVendor
          close={handleCloseAddVendor}
          onAddVendor={addVendorToBackend}
        />
      )}
    </div>
  );
}

function YourVendors({
  onAddvendor,
  onAddVendor,
  vendors,
  addVendorToMyList,
  setMyVendors,
  event_id,
  accessToken,
}) {
  const handleDeleteVendor = (ven) => {
    fetch(
      `https://doros-wedding-server.onrender.com/event_vendors/${event_id}/${ven.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          toast.success("Successfully deleted vendor from your list");
          return response.json();
        } else {
          throw new Error("Failed to delete vendor");
        }
      })
      .then((data) => {
        const updatedVendors = vendors.filter((vendor) => vendor.id !== ven.id);
        setMyVendors(updatedVendors);
        console.log(data); // if you need to process the response data
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error, show a notification, etc.
        toast.error("An error occurred while deleting the vendor");
      });
  };

  return (
    <div>
      <span className="text-2xl font-semibold">Your Wallet</span>

      <div className="flex flex-col gap-[40px] md:flex-row lg:justify-between mt-8">
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
          <button className="flex justify-center items-center px-4 py-2 text-white cursor-pointer border-2 bg-[#5f1b15] text-[18px] hover:bg-[#49120d] transition-all hover:text-white w-[200px] md:w-[150px]">
            Fill Wallet
          </button>
        </div>

        <div className="flex flex-col justify-evenly">
          <button className="flex justify-center items-center px-8 py-4 text-white cursor-pointer border-2 bg-[#5f1b15] text-[18px] hover:bg-[#49120d] transition-all hover:text-white w-[250px] md:w-[200px]">
            Pay Vendors
          </button>
          <span className="text-lg">Pay your vendor in one click</span>
        </div>
      </div>

      <MyVendorsTable
        onAddvendor={onAddvendor}
        vendors={vendors}
        onAddVendor={onAddVendor}
        addVendorToMyList={addVendorToMyList}
        onDelete={handleDeleteVendor}
        eventId={event_id}
      />
    </div>
  );
}

function MyVendorsTable({ onAddvendor, onDelete, eventId }) {
  const [myVendors, setMyVendors] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const { accessToken, refreshToken } = getTokensInCookies();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bearertoken = accessToken;
        const response = await fetch(
          `https://doros-wedding-server.onrender.com/events/${eventId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearertoken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          // console.log("Data:", data.vendors);
          setMyVendors(data.vendors);
        } else {
          console.log("Response not OK:", response.status);
        }
      } catch (err) {
        console.log("Error:", err);
      }
    };

    fetchData();
  }, [eventId, accessToken, setMyVendors, myVendors]);

  // useEffect(() => {
  //   console.log(myVendors);
  // }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedVendors = myVendors?.map((vendor) => ({
      ...vendor,
      checked: !selectAll,
    }));
    setMyVendors(updatedVendors);
  };

  const handleSingleSelect = (id) => {
    const updatedVendors = myVendors.map((vendor) => {
      if (vendor.id === id) {
        return { ...vendor, checked: !vendor.checked };
      }
      return vendor;
    });
    setMyVendors(updatedVendors);
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
              Phone
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Socials
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Category
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
          {myVendors?.map((vendor) => (
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
              <td className="px-2 py-2 whitespace-nowrap">{vendor.phone}</td>
              <td className="px-2 py-2 whitespace-nowrap">
                <a
                  href={vendor.website}
                  className="text-blue-500"
                  target="blank"
                >
                  {vendor.instagram_username === "-"
                    ? vendor.website
                    : vendor.instagram_username}
                </a>
              </td>
              <td className="px-2 py-2 whitespace-nowrap">{vendor.category}</td>

              <td className="px-2 py-2 whitespace-nowrap">{vendor.city}</td>
              <td className="px-6 py-4 whitespace-nowrap flex justify-center items-center">
                <div className="flex gap-2 text-gray-600">
                  <RiDeleteBin6Line
                    size={22}
                    className="hover:text-black cursor-pointer"
                    onClick={() => onDelete(vendor)}
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
