import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";
import { HiOutlineDownload } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidPrinter } from "react-icons/bi";
import { getTokensInCookies } from "../ui/features/auth/authCookies";
import { toast } from "react-hot-toast";
import AddProgram from "../ui/Components/AddProgram";
import EditProgram from "../ui/Components/EditProgram";
import Logo from "../features/Vendors/VendorsList";
import { useParams } from "react-router-dom";

export const program_filter_categories = [
  { name: "All" },
  { name: "Brides & Bridesmaids' Preparation" },
  { name: "Bride & Bridesmaids' Breakfast & Photoshoot" },
  { name: "Groom & Groomsmen's Preparation" },
  { name: "Wedding Ceremony" },
  { name: "Wedding Reception" },
];


function Program() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [programs, setPrograms] = useState([]);
  const { accessToken, refreshToken } = getTokensInCookies();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCategoryFilters, setCategoryFilters] = useState(false);

  const { eventId } = useParams();

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  function handleShowCategoryFilter() {
    setCategoryFilters(true);
  }

  function handleCloseCategoryFilter() {
    setCategoryFilters(false);
  }

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
          console.log("Data:", data);
          setPrograms(data.programs);
        } else {
          console.log("Response not OK:", response.status);
        }
      } catch (err) {
        console.log("Error:", err);
      }
    };

    fetchData();
  }, [accessToken, eventId]);

  const addProgramBackend = async (newProgram) => {
    try {
      const bearertoken = accessToken;
      const response = await fetch(
        "https://doros-wedding-server.onrender.com/programs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearertoken}`,
          },
          body: JSON.stringify(newProgram),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPrograms([...programs, data]);
        toast.success("Program item added successfully!");
      } else {
        console.log("Failed to add program:", response.status);
        toast.error("Failed to add program item");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("An error occurred while adding the program item");
    }
  };
  
  const handleEditProgram = async (updatedProgramData) => {
    try {
      const bearertoken = accessToken;
      const response = await fetch(
        `https://doros-wedding-server.onrender.com/programs/${updatedProgramData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearertoken}`,
          },
          body: JSON.stringify(updatedProgramData),
        }
      );

      if (response.ok) {
        const updatedPrograms = programs.map((program) =>
          program.id === updatedProgramData.id ? { ...program, ...updatedProgramData } : program
        );
        setPrograms(updatedPrograms);
        toast.success("Program item updated successfully!");
      } else {
        console.log("Failed to update program:", response.status);
        toast.error("Failed to update program item");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating the program item");
    }
  };

  function handleProgramEdit (updatedProgramData){
    const updatedPrograms = programs.map((program) =>
          program.id === updatedProgramData.id ? { ...program, ...updatedProgramData } : program
        );
        setPrograms(updatedPrograms);
  }

  const handleAddProgram = (newProgram) => {
    addProgramBackend(newProgram);
    // setShowAddModal(false);
  };

  const handleAddForm = () => {
    setShowAddModal(true);
    console.log('ckkbvk')
  };

  const handleEditForm = (program) => {
    setSelectedProgram(program);
    setShowEditModal(true);
  };

  const closeAddForm = () => {
    setShowAddModal(false);
  };

  const closeEditForm = () => {
    setShowEditModal(false);
  };

  const deleteProgram = async (programId) => {
    try {
      const bearertoken = accessToken;
      const response = await fetch(
        `https://doros-wedding-server.onrender.com/programs/${programId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearertoken}`,
          },
        }
      );

      if (response.ok) {
        setPrograms(programs.filter((program) => program.id !== programId));
        toast.success("Program item deleted successfully!");
      } else {
        toast.error("Failed to delete program item");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while deleting the program item");
    }
  };

  const handleDelete = (programId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this program item?"
    );
    if (confirmDelete) {
      deleteProgram(programId);
    }
  };

  const renderTable = (categoryName) => {
    const filteredPrograms =
      selectedCategory === "All"
        ? programs
        : programs.filter((program) => program.category === selectedCategory);
  
        
        const roleprograms = programs.filter((prog) => prog.category === categoryName);
        console.log(filteredPrograms)
        
        if (selectedCategory !== "All" && categoryName !== selectedCategory) {
          return null;
        }
        console.log(programs)
    console.log(roleprograms)

  
    return (
      <div className="mt-6 px-32">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">{categoryName}</h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Time
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
            {roleprograms?.map((program) => (
              <tr key={program.id}>
                <td className="px-6 py-4 whitespace-nowrap">{program.time}</td>
                <td className="px-6 py-4 whitespace-nowrap">{program.program_item}</td>
                <td className="px-6 py-4 whitespace-nowrap">{program.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2 text-gray-600">
                    <AiOutlineEdit
                      size={22}
                      className="hover:text-black cursor-pointer"
                      onClick={() => handleEditForm(program)}
                    />
                    <RiDeleteBin6Line
                      size={22}
                      className="hover:text-black cursor-pointer"
                      onClick={() => handleDelete(program.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

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
            className="flex items-center justify-center gap-2 px-8 py-2 cursor-pointer border-2 border-gray-400 text-[20px] hover:bg-black transition-all hover:text-white"
            onClick={handleAddForm}
          >
            <IoMdAddCircleOutline />
            Add Program
          </button>

          <button
            className="border-2 px-4 py-2 border-stone-300 flex gap-2 items-center justify-center"
            onClick={handleShowCategoryFilter}
          >
            <BsFilter />
            <span>Filter</span>
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
            close={closeAddForm}
            addProgram={handleAddProgram}
            programCategories={program_filter_categories}
            eventId={eventId}
          />
        )}

        {showEditModal && selectedProgram && (
          <EditProgram
            programData={selectedProgram}
            close={closeEditForm}
            event_id={eventId}
            programCategories={program_filter_categories}
            editProgram={handleEditProgram}
            onSubmit={handleProgramEdit}

          />
        )}

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
              : "fixed left-[-100%] top-0 z-10 h-screen w-[300px] bg-white duration-300"
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
            <div className="flex flex-col items-start ml-0 gap-4">
            {program_filter_categories.map((category) => (
  <button
    onClick={() => handleCategoryFilter(category.name)}
    className="border-2 border-gray-200 px-2 py-2 text-sm"
    key={category.name}
  >
    {category.name}
  </button>
))}
              </div>
          </div>
          
        </div>
        

  {renderTable("Brides & Bridesmaids' Preparation")}
  {renderTable("Bride & Bridesmaids' Breakfast & Photoshoot")}
  {renderTable("Groom & Groomsmen's Preparation")}
  {renderTable("Wedding Ceremony")}
  {renderTable("Wedding Reception")}

      </div>
    </div>
  );


}

export default Program;
