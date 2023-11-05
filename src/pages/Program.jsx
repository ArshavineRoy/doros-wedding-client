import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { BiSolidPrinter } from "react-icons/bi";
import { HiOutlineDownload } from "react-icons/hi";
import AddProgram from "../ui/Components/AddProgram";
import EditProgram from "../ui/Components/EditProgram";

function Program() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProgramItem, setSelectedProgramItem] = useState(null);
  const [programItems, setProgramItems] = useState({});

  const fakeProgramData = {
    "Brides & Bridesmaids' Preparation": [
      {
        id: 1,
        time: "08:00 AM",
        category: "Brides & Bridesmaids' Preparation",
        program_item: "Makeup and Hair Styling",
        duration: "1 hour",
      },
      {
        id: 2,
        time: "09:30 AM",
        category: "Brides & Bridesmaids' Preparation",
        program_item: "Getting Dressed",
        duration: "30 minutes",
      },
    ],
    "Bride & Bridesmaids' Breakfast & Photoshoot": [
      {
        id: 3,
        time: "10:00 AM",
        category: "Bride & Bridesmaids' Breakfast & Photoshoot",
        program_item: "Breakfast",
        duration: "1 hour",
      },
      {
        id: 4,
        time: "11:30 AM",
        category: "Bride & Bridesmaids' Breakfast & Photoshoot",
        program_item: "Photoshoot",
        duration: "2 hours",
      },
    ],
  };

  useEffect(() => {
    // Initialize with fake data
    setProgramItems(fakeProgramData);
  }, []);

  const addProgramItem = (newProgramItem) => {
    const updatedProgramItems = { ...programItems };
    if (updatedProgramItems[newProgramItem.category]) {
      const newId =
        Math.max(
          ...updatedProgramItems[newProgramItem.category].map((item) => item.id)
        ) + 1;
      newProgramItem.id = newId;
      updatedProgramItems[newProgramItem.category].push(newProgramItem);
    } else {
      newProgramItem.id = 1;
      updatedProgramItems[newProgramItem.category] = [newProgramItem];
    }
    setProgramItems(updatedProgramItems);
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
    const programItemsForCategory =
      updatedProgramItems[selectedProgramItem.category];

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

  const deleteProgramItem = (programId) => {
    const updatedProgramItems = { ...programItems };
    Object.keys(updatedProgramItems).forEach((category) => {
      updatedProgramItems[category] = updatedProgramItems[category].filter(
        (item) => item.id !== programId
      );
    });
    setProgramItems(updatedProgramItems);
    toast.success("Program item deleted successfully!");
  };

  const handleDeleteProgramItem = (programId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this program item?"
    );
    if (confirmDelete) {
      deleteProgramItem(programId);
    }
  };

  const categories = [
    "Brides & Bridesmaids' Preparation",
    "Bride & Bridesmaids' Breakfast & Photoshoot",
    "Groom & Groomsmen's Preparation",
    "Wedding Ceremony",
    "Wedding Reception",
  ];

  return (
    <div className="py-20">
      <div className="flex items-center px-[126px]">
        <div className="flex-1 border-b-2 border-black"></div>
        <div className="px-4 font-bold text-[30px] ">Event Program</div>
        <div className="flex-1 border-b-2 border-black"></div>
      </div>

      <div>
        <div className="flex justify-between items-center px-32 py-8">
          <button
            className="flex items-center justify-center gap-2 px-8 py-2 cursor-pointer border-2 border-gray-400 text-[20px] hover-bg-black hover-text-white"
            onClick={() => setShowAddModal(true)}
          >
            <IoMdAddCircleOutline />
            Add Item
          </button>
          <div className="flex gap-2">
            <BiSolidPrinter
              size={25}
              className="cursor-pointer text-stone-700 hover-text-black"
            />
            <HiOutlineDownload
              size={25}
              className="cursor-pointer text-stone-700 hover-text-black"
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

        {categories.map((category) => (
          <div key={category}>
            <h2 className="text-lg font-semibold">{category}</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="flex justify-between">
                  <th className="flex-1 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-300">
                    Time
                  </th>
                  <th className="flex-1 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-300">
                    Category
                  </th>
                  <th className="flex-1 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-300">
                    Program Item
                  </th>
                  <th className="flex-1 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-300">
                    Duration
                  </th>
                  <th className="flex-1 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {programItems[category]?.map((programItem) => (
                  <tr key={programItem.id}>
                    <td className="px-6 py-4">{programItem.time}</td>
                    <td className="px-6 py-4">{programItem.category}</td>
                    <td className="px-6 py-4">{programItem.program_item}</td>
                    <td className="px-6 py-4">{programItem.duration}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 text-gray-600">
                        <AiOutlineEdit
                          size={22}
                          className="hover-text-black cursor-pointer"
                          onClick={() => handleEditForm(programItem)}
                        />
                        <RiDeleteBin6Line
                          size={22}
                          className="hover-text-black cursor-pointer"
                          onClick={() =>
                            handleDeleteProgramItem(programItem.id)
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Program;
