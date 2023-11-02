import React, { useState } from "react";
import { BiSolidPrinter } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { HiOutlineDownload } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import AddTask from "../features/Checklist/AddTask";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditTask from "../features/Checklist/EditTask";
import { dateCalculator } from "../utilities/datecalc";

const fake_tasks = [
  {
    id: 1,
    item: "Buy cake",
    person: "Moses",
    role: "Overall Coordinator",
    completed_status: true,
    contact: "7893810",
    duration: "2 Weeks",
    due_date: "Dec 7th",
  },
  {
    id: 2,
    item: "Buy dress",
    person: "Asharvin",
    role: "Overall Coordinator",
    completed_status: true,
    contact: "222",
    duration: "4 Weeks",
    due_date: "Dec 7th",
  },
  {
    id: 3,
    item: "Book a wedding venue",
    person: "Martin",
    role: "Aesthetics Coordinator",
    completed_status: false,
    contact: "1111",
    duration: "9 Weeks",
    due_date: "Jan 6",
  },
  {
    id: 4,
    item: "Book a photography vendor",
    person: "Test",
    role: "Secretary & Treasurer",
    completed_status: false,
    contact: "1111",
    duration: "10 days",
    due_date: "Jan 6",
  },
];

function Checklist() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [tasks, setTasks] = useState(fake_tasks);
  const [selectedTask, setSelectedTask] = useState(null);

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

  const handleStatusChange = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, completed_status: !task.completed_status }
        : task
    );
    setTasks(updatedTasks);
  };

  const handleTaskUpdate = (updatedTaskData) => {
    const updatedTasks = tasks.map((task) =>
      task.id === selectedTask.id ? { ...task, ...updatedTaskData } : task
    );
    setTasks(updatedTasks);
  };

  const renderTable = (role) => {
    const roleTasks = tasks.filter((task) => task.role === role);

    function timeLeft(duration) {
      const { timeToAccomplish } = dateCalculator("2023-11-11", duration);

      return timeToAccomplish;
    }

    return (
      <div className="mt-6 px-32">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">{role}</h1>
        <table className="min-w-full divide-y divide-gray-200">
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
                    <AiOutlineEdit
                      size={22}
                      className="hover:text-black cursor-pointer"
                      onClick={() => handleEditForm(task)}
                    />
                    <RiDeleteBin6Line
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
    );
  };

  return (
    <div className="py-20">
      <div className="flex items-center">
        <div className="flex-1 border-b-2 border-black"></div>
        <div className="px-4 font-bold text-[30px] ">Event Checklist</div>
        <div className="flex-1 border-b-2 border-black"></div>
      </div>

      <div>
        <div className="flex justify-between items-center px-32 py-8">
          <button
            className="flex items-center justify-center gap-2 px-8 py-2 cursor-pointer border-2 border-gray-400 text-[20px] hover:bg-black transition-all hover:text-white"
            onClick={handleAddForm}
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

        {showAddModal && <AddTask close={closeAddForm} />}
        {showEditModal && selectedTask && (
          <EditTask
            taskData={selectedTask}
            close={closeEditForm}
            onSubmit={handleTaskUpdate}
          />
        )}

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
