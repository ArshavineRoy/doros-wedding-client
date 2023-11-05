import React, { useState, useEffect } from "react";
import { getTokensInCookies } from '../ui/features/auth/authCookies';
import { toast } from 'react-hot-toast';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { AiOutlineEdit } from 'react-icons/ai';
import { BiSolidPrinter } from 'react-icons/bi';
import { HiOutlineDownload } from 'react-icons/hi';
import AddProgram from '../ui/Components/AddProgram';
import EditProgram from '../ui/Components/EditProgram';

function Program() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProgramItem, setSelectedProgramItem] = useState(null);
  const [programItems, setProgramItems] = useState({});
  const { accessToken } = getTokensInCookies(); // Removed unused refreshToken variable

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bearertoken = accessToken;
        const response = await fetch('https://doros-wedding-server.onrender.com/programs', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearertoken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const categorizedProgramItems = {};

          data.forEach((item) => {
            if (categorizedProgramItems[item.category]) {
              categorizedProgramItems[item.category].push(item);
            } else {
              categorizedProgramItems[item.category] = [item];
            }
          });

          setProgramItems(categorizedProgramItems);
        } else {
          console.log('Response not OK:', response.status);
        }
      } catch (err) {
        console.log('Error:', err);
      }
    };

    fetchData();
  }, [accessToken]);

  const addProgramItem = async (newProgramItem) => {
    try {
      const bearertoken = accessToken;
      const response = await fetch('https://doros-wedding-server.onrender.com/programs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearertoken}`,
        },
        body: JSON.stringify(newProgramItem),
      });

      if (response.ok) {
        const data = await response.json();
        const updatedProgramItems = { ...programItems };
        if (updatedProgramItems[newProgramItem.category]) {
          updatedProgramItems[newProgramItem.category].push(data);
        } else {
          updatedProgramItems[newProgramItem.category] = [data];
        }
        setProgramItems(updatedProgramItems);
      } else {
        console.log('Failed to add program item:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  const handleAddProgramItem = (newProgramItem) => {
    addProgramItem(newProgramItem);
    setShowAddModal(false);
  };

  const handleAddForm = () => {
    setShowAddModal(true);
  };

  const handleEditForm = (programItem) => {
    setSelectedProgramItem(programItem);
    setShowEditModal(true);
  };

  const closeAddForm = () => {
    setShowAddModal(false);
  };

  const closeEditForm = () => {
    setShowEditModal(false);
  };

  const handleProgramItemUpdate = (updatedProgramItemData) => {
    const updatedProgramItems = { ...programItems };
    const programItemsForCategory = updatedProgramItems[selectedProgramItem.category];

    if (programItemsForCategory) {
      const updatedProgramItemsForCategory = programItemsForCategory.map((item) =>
        item.id === selectedProgramItem.id ? { ...item, ...updatedProgramItemData } : item
      );

      updatedProgramItems[selectedProgramItem.category] = updatedProgramItemsForCategory;
    }

    setProgramItems(updatedProgramItems);
  };

  const deleteProgramItem = async (programId) => {
    try {
      const bearertoken = accessToken;
      const response = await fetch(
        `https://doros-wedding-server.onrender.com/programs/${programId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearertoken}`,
          },
        }
      );

      if (response.ok) {
        const updatedProgramItems = { ...programItems };
        Object.keys(updatedProgramItems).forEach((category) => {
          updatedProgramItems[category] = updatedProgramItems[category].filter((item) => item.id !== programId);
        });
        setProgramItems(updatedProgramItems);
        toast.success('Program item deleted successfully!');
      } else {
        toast.error('Failed to delete program item');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while deleting the program item');
    }
  };

  const handleDeleteProgramItem = (programId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this program item?');
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
            onClick={handleAddForm}
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
          <AddProgram close={closeAddForm} addProgram={handleAddProgramItem} programCategories={categories} />
        )}

        {showEditModal && selectedProgramItem && (
          <EditProgram
            programItemData={selectedProgramItem}
            close={closeEditForm}
            onSubmit={handleProgramItemUpdate}
          />
        )}

        <div className="px-32 mt-6">
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
              {categories.map((category) => (
                <React.Fragment key={category}>
                  <tr className="bg-gray-100">
                    <td className="flex-1 px-6 py-3 text-left text-sm font-medium text-gray-900">
                      {category}
                    </td>
                    <td className="flex-4 border-t border-gray-300">
                      <div className="w-full">
                        {programItems[category]?.map((programItem) => (
                          <div className="flex" key={programItem.id}>
                            <div className="flex-1 px-6 py-4">{programItem.time}</div>
                            <div className="flex-1 px-6 py-4">{programItem.program_item}</div>
                            <div className="flex-1 px-6 py-4">{programItem.duration}</div>
                            <div className="flex-1 px-6 py-4">
                              <div className="flex gap-2 text-gray-600">
                                <AiOutlineEdit
                                  size={22}
                                  className="hover-text-black cursor-pointer"
                                  onClick={() => handleEditForm(programItem)}
                                />
                                <RiDeleteBin6Line
                                  size={22}
                                  className="hover-text-black cursor-pointer"
                                  onClick={() => handleDeleteProgramItem(programItem.id)}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Program;
