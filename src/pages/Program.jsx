import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { BiSolidPrinter } from "react-icons/bi";
import { HiOutlineDownload } from "react-icons/hi";
import AddProgram from "../ui/Components/AddProgram";
import EditProgram from "../ui/Components/EditProgram";
import { getTokensInCookies } from "../ui/features/auth/authCookies";
import { useParams } from "react-router-dom";

function Program() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProgramItem, setSelectedProgramItem] = useState(null);
  const [programItems, setProgramItems] = useState({});
  const { accessToken, refreshToken } = getTokensInCookies();
  const { eventId } = useParams(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bearertoken = accessToken;
        const response = await fetch(`https://doros-wedding-server.onrender.com/programs/${eventId}.`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearertoken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Data:", data);
          setProgramItems(data);
        } else {
          console.log("Response not OK:", response.status);
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchData();
  }, [accessToken, eventId]);

  const addProgramItem = async (newProgramItem) => {
    try {
      const bearertoken = accessToken;
      console.log(bearertoken)
      const response = await fetch(`https://doros-wedding-server.onrender.com/programs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearertoken}`,
        },
        body: JSON.stringify(newProgramItem),
      });

      if (response.ok) {
        const createdProgramItem = await response.json();
        setProgramItems((prevProgramItems) => {
          return {
            ...prevProgramItems,
            [createdProgramItem.category]: [
              ...(prevProgramItems[createdProgramItem.category] || []),
              createdProgramItem,
            ],
          };
        });
        toast.success("Program item added successfully!");
      } else {
        console.log("Add Program Item Response not OK:", response.status);
        console.log("Error details:", await response.text());
        toast.error("Failed to add a program item");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const deleteProgramItem = async (programId) => {
    try {
      const bearertoken = accessToken;
      const response = await fetch(`https://doros-wedding-server.onrender.com/programs/${programId}?eventId=${eventId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearertoken}`,
        },
      });

      if (response.ok) {
        setProgramItems((prevProgramItems) => {
          const updatedProgramItems = { ...prevProgramItems };
          Object.keys(updatedProgramItems).forEach((category) => {
            updatedProgramItems[category] = updatedProgramItems[category].filter(
              (item) => item.id !== programId
            );
          });
          return updatedProgramItems;
        });
        toast.success("Program item deleted successfully!");
      } else {
        console.log("Delete Program Item Response not OK:", response.status);
        toast.error("Failed to delete a program item");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleAddProgramItem = (newProgramItem) => {
    addProgramItem(newProgramItem);
    setShowAddModal(false);
  };

  const handleEditForm = (programItem) => {
    setSelectedProgramItem(programItem);
    setShowEditModal(true);
  };

  const closeEditForm = () => {
    setShowEditModal(false);
  };

  const handleProgramItemUpdate = (updatedProgramItemData) => {
    const updatedProgramItems = { ...programItems };
    const programItemsForCategory = updatedProgramItems[selectedProgramItem.category];

    if (programItemsForCategory) {
      const updatedProgramItemsForCategory = programItemsForCategory.map(
        (item) =>
          item.id === selectedProgramItem.id
            ? { ...item, ...updatedProgramItemData }
            : item
      );

      updatedProgramItems[selectedProgramItem.category] = updatedProgramItemsForCategory;
    }

    setProgramItems(updatedProgramItems);
  };

  const categories = [
    "Brides & Bridesmaids' Preparation",
    "Bride & Bridesmaids' Breakfast & Photoshoot",
    "Groom & Groomsmen's Preparation",
    "Wedding Ceremony",
    "Wedding Reception",
  ];

  return (
    <div className="mt-6 px-32">
        <h1 className="text-2xl font-bold text-gray-800 mb-3"></h1>
        <div className="flex items-center px-4">
          <div className="flex-1 border-b-2 border-black"></div>
          <div className="px-4 font-bold text-[30px]">Event Program</div>
          <div className="flex-1 border-b-2 border-black"></div>
        </div>
  
        <div>
          <div className="flex justify-between items-center px-4 py-8">
            <button
              className="flex items-center justify-center gap-2 px-8 py-2 bg-[#5f1b15] text-white  cursor-pointer border-2 border-gray-400 text-[20px] hover:bg-black hover:text-white"
              onClick={() => setShowAddModal(true)}
            >
              <IoMdAddCircleOutline />
              Add Item
            </button>
            <div className="flex gap-2">
              <BiSolidPrinter
                size={25}
                className="cursor-pointer text-stone-700 hover:text-black"
              />
              <HiOutlineDownload
                size={25}
                className="cursor-pointer text-stone-700 hover:text-black"
              />
            </div>
          </div>
  
          {showAddModal && (
            <AddProgram
              close={() => setShowAddModal(false)}
              addProgram={handleAddProgramItem}
              programCategories={categories}
            />
          )}
  
          {showEditModal && selectedProgramItem && (
            <EditProgram
              close={closeEditForm}
              editProgram={handleProgramItemUpdate}
              programToEdit={selectedProgramItem}
            />
          )}
  
  {categories.map((category, index) => (
  <div key={category} className={index !== 0 ? '' : ''}>
    <h1 className="text-lg font-semibold">{category}</h1>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 sm:table-auto md:table-fixed">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Program Item
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Duration
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {programItems[category]?.map((programItem) => (
            <tr key={programItem.id}>
              <td className="px-6 py-3 whitespace-nowrap sm:w-1/6 md:w-1/5">
                {programItem.time}
              </td>
              <td className="px-6 py-3 whitespace-nowrap sm:w-1/6 md:w-1/5">
                {programItem.category}
              </td>
              <td className="px-6 py-3 whitespace-nowrap sm:w-1/6 md:w-1/5">
                {programItem.program_item}
              </td>
              <td className="px-6 py-3 whitespace-nowrap sm:w-1/6 md:w-1/5">
                {programItem.duration}
              </td>
              <td className="px-6 py-3 whitespace-nowrap sm:w-1/6 md:w-1/5">
                <div className="flex gap-2 text-gray-600">
                  <AiOutlineEdit
                    size={22}
                    className="hover:text-black cursor-pointer"
                    onClick={() => handleEditForm(programItem)}
                  />
                  <RiDeleteBin6Line
                    size={22}
                    className="hover:text-black cursor-pointer"
                    onClick={() => deleteProgramItem(programItem.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
))}
 </div>
 </div>
  );  
}

export default Program;
