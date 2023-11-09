import React, { useEffect, useState } from "react";
import { BiSolidPrinter } from "react-icons/bi";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { HiOutlineDownload } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import AddTask from "../features/Checklist/AddTask";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditTask from "../features/Checklist/EditTask";
import { dateCalculator } from "../utilities/datecalc";
import { getTokensInCookies } from "../ui/features/auth/authCookies";
import { toast } from "react-hot-toast";
import { BsDownload, BsFilter } from "react-icons/bs";
import Logo from "../features/Vendors/VendorsList";
import { Link, useParams } from "react-router-dom";

export const task_filter_categories = [
  { name: "All" },
  { name: "Overall Coordinator" },
  { name: "Secretary & Treasurer" },
  { name: "Food & Beverage Coordinator" },
  { name: "Aesthetics Coordinator" },
  { name: "Experience Coordinator" },
  { name: "Transport Coordinator" },
  { name: "Groomsmen's Coordinator" },
  { name: "Bridesmaid's Coordinator" },
  { name: "Ushers & Gifts Personnel Coordinator" },
  { name: "Security & Gift Movers Coordinator" },
];

function Checklist() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [data, setData] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]); // Assuming 'fake_tasks' is your initial data
  const { accessToken, refreshToken } = getTokensInCookies();

  const [selectedRole, setSelectedRole] = useState("All");
  const [showCategoryFilters, setCategoryFilters] = useState(false);

  const { eventId } = useParams();

  const handleRoleFilter = (role) => {
    setSelectedRole(role);
    setCategoryFilters(false);
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
          setTasks(data.tasks);
          setData(data);
        } else {
          console.log("Response not OK:", response.status);
        }
      } catch (err) {
        console.log("Error:", err);
      }
    };

    fetchData();
  }, []);

  const addTaskBackend = async (newTask) => {
    try {
      const bearertoken = accessToken;
      const response = await fetch(
        "https://doros-wedding-server.onrender.com/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearertoken}`,
          },
          body: JSON.stringify(newTask),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTasks([...tasks, data]); // Update state with the new task added
      } else {
        console.log("Failed to add task:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleAddTask = (newTask) => {
    addTaskBackend(newTask);
    setShowAddModal(false);
  };

  const handleAddForm = () => {
    setShowAddModal(true);
  };

  const handleEditForm = (task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  const closeAddForm = () => {
    setShowAddModal(false);
  };

  const closeEditForm = () => {
    setShowEditModal(false);
  };
  const handleStatusChange = async (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, completed_status: !task.completed_status }
        : task
    );
    setTasks(updatedTasks);

    try {
      const bearertoken = accessToken;
      const response = await fetch(
        `https://doros-wedding-server.onrender.com/tasks/${taskId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearertoken}`,
          },
          body: JSON.stringify({
            completed_status: updatedTasks.find((task) => task.id === taskId)
              .completed_status,
          }),
        }
      );

      if (response.ok) {
        // Task status updated successfully on the backend
        console.log("Task status updated on the server.");
      } else {
        // Revert the local state if the request fails
        console.error("Failed to update the task status:", response.status);
        setTasks(
          tasks.map((task) =>
            task.id === taskId
              ? { ...task, completed_status: !task.completed_status }
              : task
          )
        );
      }
    } catch (error) {
      // Revert the local state if an error occurs
      console.error("Error:", error);
      setTasks(
        tasks.map((task) =>
          task.id === taskId
            ? { ...task, completed_status: !task.completed_status }
            : task
        )
      );
    }
  };

  const handleTaskUpdate = (updatedTaskData) => {
    const updatedTasks = tasks.map((task) =>
      task.id === selectedTask.id ? { ...task, ...updatedTaskData } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = async (taskId) => {
    try {
      const bearertoken = accessToken; // Replace this with your actual bearer token
      const response = await fetch(
        `https://doros-wedding-server.onrender.com/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearertoken}`,
          },
        }
      );

      if (response.ok) {
        setTasks(tasks.filter((task) => task.id !== taskId));
        toast.success("Task deleted successfully!");
      } else {
        toast.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while deleting the task");
    }
  };

  const handleDelete = (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
      deleteTask(taskId);
    }
  };

  const renderTable = (role) => {
    const filteredTasks =
      selectedRole === "All"
        ? tasks
        : tasks.filter((task) => task.role === selectedRole);

    if (selectedRole !== "All" && role !== selectedRole) {
      return null;
    }

    const roleTasks = filteredTasks.filter((task) => task.role === role);

    function timeLeft(duration) {
      const { timeToAccomplish } = dateCalculator(data.date, duration);
      return timeToAccomplish;
    }

    return (
      <div className="mt-6 px-32">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">{role}</h1>
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Completed
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Person
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Contact Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Time Left
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {roleTasks.map((task) => (
              <tr
                key={task.id}
                className={
                  task.completed_status
                    ? "bg-green-200"
                    : timeLeft(task.duration).includes("ago")
                    ? "bg-red-200"
                    : timeLeft(task.duration).includes("left")
                    ? "bg-yellow-100"
                    : ""
                }
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={task.completed_status}
                    onChange={() => handleStatusChange(task.id)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                </td>
                <td
                  className={
                    task.completed_status
                      ? "line-through px-6 py-4 whitespace-nowrap"
                      : "px-6 py-4 whitespace-nowrap"
                  }
                >
                  {task.item}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{task.person}</td>
                <td className="px-6 py-4 whitespace-nowrap">{task.contact}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {task.completed_status ? "Done" : timeLeft(task.duration)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2 text-gray-600">
                    {!task.completed_status && (
                      <AiOutlineEdit
                        size={22}
                        className="hover:text-black cursor-pointer"
                        onClick={() => handleEditForm(task)}
                      />
                    )}
                    <RiDeleteBin6Line
                      size={22}
                      className="hover:text-black cursor-pointer"
                      onClick={() => handleDelete(task.id)}
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
        <div className="px-4 font-bold text-[30px] ">Event Checklist</div>
        <div className="flex-1 border-b-2 border-black"></div>
      </div>

      <Link to={`/dashboard/${eventId}`} className="px-32 text-stone-400">
        Back to dashboard &larr;
      </Link>

      <div>
        <div className="flex justify-between items-center px-32 py-8">
          <button
            className="flex items-center justify-center gap-2 px-8 py-2 cursor-pointer border-2 border-gray-400 text-[20px] hover:bg-black transition-all hover:text-white"
            onClick={handleAddForm}
          >
            <IoMdAddCircleOutline />
            Add Item
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
          <AddTask
            close={closeAddForm}
            addTask={handleAddTask}
            event_id={eventId}
          />
        )}
        {showEditModal && selectedTask && (
          <EditTask
            taskData={selectedTask}
            close={closeEditForm}
            onSubmit={handleTaskUpdate}
            event_id={eventId}
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
            <div className="flex flex-col items-start ml-0 gap-4">
              {task_filter_categories.map((category) => (
                <div key={category.name}>
                  <button
                    onClick={() => handleRoleFilter(category.name)}
                    className="border-2 border-gray-200 px-2 py-2 text-sm"
                  >
                    {category.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {renderTable("Overall Coordinator")}
        {renderTable("Secretary & Treasurer")}
        {renderTable("Food & Beverage Coordinator")}
        {renderTable("Aesthetics Coordinator")}
        {renderTable("Experience Coordinator")}
        {renderTable("Transport Coordinator")}
        {renderTable("Groomsmen's Coordinator")}
        {renderTable("Bridesmaid's Coordinator")}
        {renderTable("Ushers & Gifts Personnel Coordinator")}
        {renderTable("Security & Gift Movers Coordinator")}
      </div>
    </div>
  );
}

export default Checklist;
