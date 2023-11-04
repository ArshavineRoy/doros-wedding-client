import React, { useState, useEffect } from 'react';
import AddProgram from '../ui/Components/AddProgram';
import EditProgram from '../ui/Components/EditProgram';
import { getTokensInCookies } from '../ui/features/auth/authCookies';
import { toast } from 'react-hot-toast';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { AiOutlineEdit } from 'react-icons/ai';
import { BiSolidPrinter } from 'react-icons/bi';
import { HiOutlineDownload } from 'react-icons/hi';

function Program() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProgramItem, setSelectedProgramItem] = useState(null);
  const [programItems, setProgramItems] = useState([]); // Provide an initial empty array
  const { accessToken, refreshToken } = getTokensInCookies();

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
          setProgramItems(data);
        } else {
          console.log('Response not OK:', response.status);
        }
      } catch (err) {
        console.log('Error:', err);
      }
    };

    fetchData();
  }, []);

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
        setProgramItems([...programItems, data]);
      } else {
        console.log('Failed to add program item:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

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
    const updatedProgramItems = programItems.map((item) =>
      item.id === selectedProgramItem.id ? { ...item, ...updatedProgramItemData } : item
    );
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
        setProgramItems(programItems.filter((item) => item.id !== programId));
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

        {showAddModal && programItems && (
          <AddProgram close={closeAddForm} addProgramItem={handleAddProgramItem} />
        )}

        {showEditModal && selectedProgramItem && (
          <EditProgram
            programItemData={selectedProgramItem}
            close={closeEditForm}
            onSubmit={handleProgramItemUpdate}
          />
        )}

        <div className="px-32 mt-6">
          {categories.map((category, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold my-2">{category}</h2>
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
                  {/* Render your empty table rows here */}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Program;
