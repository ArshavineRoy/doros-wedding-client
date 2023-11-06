import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { getTokensInCookies } from "../features/auth/authCookies";

const Budget = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddBudgetModalOpen, setIsAddBudgetModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editedItem, setEditedItem] = useState({});
  const [editItemId, setEditItemId] = useState(null);
  const { accessToken } = getTokensInCookies();

  // Function to calculate the budget percentage
const calculateBudgetPercentage = (item) => {
  if (item.estimate_cost === 0) {
    return 0; // Avoid division by zero
  }
  return ((item.amount_paid / item.estimate_cost) * 100).toFixed(2);
};

  // Fetch data from an API
  const fetchData = async () => {
    try {
      const bearertoken = accessToken;
      const response = await fetch("https://doros-wedding-server.onrender.com/budgets", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearertoken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network Response Not Okay");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to edit an item
  const handleEditItem = (rowIndex) => {
    setSelectedRow(rowIndex);
    setIsModalOpen(true);
    const selectedItem = data[rowIndex];
    setEditedItem({ ...selectedItem });
    setEditItemId(selectedItem.id);
  };

  // Function to update an item (PATCH request)
  const handleUpdateItem = async () => {
    try {
      const bearertoken = accessToken;
      const editedItemCopy = { ...editedItem };
      //  convert to a boolean value
    editedItemCopy.contract_signed = editedItemCopy.contract_signed === "yes";
      const response = await fetch(
        `https://doros-wedding-server.onrender.com/budgets/${editItemId}`,
        {
          method: "PATCH", // Use PATCH for updating an item
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearertoken}`,
          },
          body: JSON.stringify(editedItemCopy),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      fetchData();
      setIsModalOpen(false); 
    } catch (error) {
      console.error("Error updating record", error);
    }
  };

  // Function to delete an item
  const handleDelete = (itemId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      deleteData(itemId);
    }
  };

  // Function to delete an item (DELETE request)
  const deleteData = async (itemId) => {
    try {
      const bearertoken = accessToken;
      const response = await fetch(
        `https://doros-wedding-server.onrender.com/budgets/${itemId}`,
        {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearertoken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      fetchData();
    } catch (error) {
      console.error("Error deleting record", error);
    }
  };

  // Function to create a new budget item (POST request)
  const handleCreateItem = async (newItem) => {
    try {
      const bearertoken = accessToken;
      newItem.event_id = 1;
      newItem.contract_signed = newItem.contract_signed === "yes";
      const response = await fetch(
        "https://doros-wedding-server.onrender.com/budgets",
        {
          method: "POST", // Use POST to create a new item
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearertoken}`,
          },
          body: JSON.stringify(newItem),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      fetchData();
      setIsAddBudgetModalOpen(false);
    } catch (error) {
      console.error("Error creating a new item", error);
    }
  };

  // Function to handle form submission in the "Add Budget" modal
  const handleSubmitAddBudget = (event) => {
    event.preventDefault();
    const newItem = {
      priority: event.target.priority.value,
      item: event.target.item.value,
      person_in_charge: event.target.person_in_charge.value,
      estimate_cost: event.target.estimate_cost.value,
      amount_paid: parseFloat(event.target.amount_paid.value),
      contract_signed: event.target.contract_signed.value === "yes",
      event_id:1,
      notes: event.target.notes.value,
    };
    handleCreateItem(newItem);
  };

  // Function to open the edit modal
  const openModal = (rowIndex) => {
    setSelectedRow(rowIndex);
    setIsModalOpen(true);
  };

  // Function to open the "Add Budget" modal
  const openAddBudgetModal = () => {
    setIsAddBudgetModalOpen(true);
  };

  // Function to close the edit modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  // Function to close the "Add Budget" modal
  const closeAddBudgetModal = () => {
    setIsAddBudgetModalOpen(false);
  };

  return (
    <div className="bg-gray-200 p-6 mt-48">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-4">Priority Items</h1>
          <button
            onClick={openAddBudgetModal}
            className="bg-green-500 text-white p-2 rounded"
          >
            Add Budget
          </button>
        </div>
        <div className="overflow-hidden">
          <table className="w-full bg-white shadow-md rounded">
            <thead>
              <tr>
                <th className="px-4 py-2">Priority</th>
                <th className="px-4 py-2">Item</th>
                <th className="px-4 py-2">Person in Charge</th>
                <th className="px-4 py-2">Budget Percentage</th>
                <th className="px-4 py-2">Estimate Cost</th>
                <th className="px-4 py-2">Amount Paid</th>
                <th className="px-4 py-2">Signed Contract</th>
                <th className="px-4 py-2">Notes</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id} onClick={() => handleEditItem(index)} className="cursor-pointer">
                  <td className="border px-4 py-2">{item.priority}</td>
                  <td className="border px-4 py-2">{item.item}</td>
                  <td className="border px-4 py-2">{item.person_in_charge}</td>
                  <td className="border px-4 py-2">{calculateBudgetPercentage(item)}%</td>
                  <td className="border px-4 py-2">{item.estimate_cost}</td>
                  <td className="border px-4 py-2">{item.amount_paid}</td>
                  <td className="border px-4 py-2">{item.signed_contract}</td>
                  <td className="border px-4 py-2">{item.notes}</td>
                  <td className="border px-4 py-2">
                    <button onClick={() => handleDelete(item.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-end z-50">
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-container bg-white w-full h-full md:w-1/2 lg:w-1/3 md:max-h-screen lg:max-h-screen rounded shadow-lg p-4 right-0">
            {/* Modal content */}
            <h1 className="text-2xl font-bold mb-4">Edit Item</h1>
            <div>
              <label htmlFor="person_in_charge">Person In Charge:</label>
              <input
                type="text"
                id="person_in_charge"
                name="person_in_charge"
                className="border rounded w-full py-2 px-3 mb-3"
                placeholder="Enter Person In Charge"
              />
            </div>
            <div>
              <label htmlFor="amount_paid">Amount Paid:</label>
              <input
                type="number"
                id="amount_paid"
                name="amount_paid"
                className="border rounded w-full py-2 px-3 mb-3"
                placeholder="Enter Amount Paid"
              />
            </div>
            <div>
              <label htmlFor="estimate_cost">Estimate Cost:</label>
              <input
                type="number"
                id="estimate_cost"
                name="estimate_cost"
                className="border rounded w-full py-2 px-3 mb-3"
                placeholder="Enter Estimate Cost"
              />
            </div>
            <label
              htmlFor="contract_signed"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Contract Signed
            </label>
            <select
              id="contract_signed"
              name="contract_signed"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
            <div className="flex justify-start mt-4">
              <button
                className="bg-blue-500 text-white p-2 rounded mr-2"
                onClick={handleUpdateItem}
              >
                Save
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddBudgetModalOpen && (
        <div className="fixed inset-0 flex items-center justify-end z-50">
          <div className="modal-overlay" onClick={closeAddBudgetModal}></div>
          <div className="modal-container bg-white w-full h-full md:w-1/2 lg:w-1/3 md:max-h-screen lg:max-h-screen rounded shadow-lg p-4 right-0">
            {/* Add budget Modal */}
            <h1 className="text-2xl font-bold mb-4">Add Budget</h1>
            <form onSubmit={handleSubmitAddBudget}>
              <div>
                <label htmlFor="priority">Priority:</label>
                <input
                  type="text"
                  id="priority"
                  name="priority"
                  className="border rounded w-full py-2 px-3 mb-3"
                  placeholder="Enter Priority"
                />
              </div>
              <div>
                <label htmlFor="item">Item:</label>
                <input
                  type="text"
                  id="item"
                  name="item"
                  className="border rounded w-full py-2 px-3 mb-3"
                  placeholder="Enter Item"
                />
              </div>
              <div>
                <label htmlFor="person_in_charge">Person In Charge:</label>
                <input
                  type="text"
                  id="person_in_charge"
                  name="person_in_charge"
                  className="border rounded w-full py-2 px-3 mb-3"
                  placeholder="Enter Person In Charge"
                />
              </div>
              <div>
                <label htmlFor="estimate_cost">Estimate Cost:</label>
                <input
                  type="number"
                  id="estimate_cost"
                  name="estimate_cost"
                  className="border rounded w-full py-2 px-3 mb-3"
                  placeholder="Enter Estimate Cost"
                />
              </div>
              <div>
                <label htmlFor="amount_paid">Amount Paid:</label>
                <input
                  type="number"
                  id="amount_paid"
                  name="amount_paid"
                  className="border rounded w-full py-2 px-3 mb-3"
                  placeholder="Enter Amount Paid"
                />
              </div>
              <label
                htmlFor="contract_signed"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Contract Signed
              </label>
              <select
                id="contract_signed"
                name="contract_signed"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="yes">yes</option>
                <option value="no">no</option>
              </select>

<label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4">Notes</label>
<textarea id="notes" name="notes" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

              {/* Fields Added */}
              <div className="flex justify-start mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded mr-2"
                >
                  Save
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={closeAddBudgetModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budget;
