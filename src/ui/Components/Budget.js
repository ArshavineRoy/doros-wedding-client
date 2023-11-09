import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { getTokensInCookies } from "../features/auth/authCookies";
import { useParams } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Budget = () => {
  const [data, setData] = useState([]);
  const [amountExceedsError, setAmountExceedsError] = useState("");
  const [maxBudget, setMaxBudget] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddBudgetModalOpen, setIsAddBudgetModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editedItem, setEditedItem] = useState({});
  const [editItemId, setEditItemId] = useState(null);
  const { accessToken } = getTokensInCookies();
  const { eventId } = useParams();

  //  calculate total amount that is inside the table
  const totalAmount = data.reduce(
    (acc, item) => acc + parseFloat(item.amount_paid),
    0
  );

  // calculate maximum budget percentage
  const calculateMaxBudgetPercentage = () => {
    if (totalAmount > maxBudget) {
      return 100; // If total amount exceeds max budget, show 100%
    } else {
      return (totalAmount / maxBudget) * 100; // Calculate the percentage
    }
  };

  // Function to calculate the budget percentage

  const calculateBudgetPercentage = (item) => {
    const estimateCost = parseInt(item.estimate_cost);
    const amountPaid = parseInt(item.amount_paid);

    if (isNaN(estimateCost) || isNaN(amountPaid) || estimateCost === 0) {
      return 0; // Not dividing by 0
    }

    const percentage = ((amountPaid / estimateCost) * 100).toFixed(2);
    return percentage;
  };

  // fetch the events to get the users budget
  const fetchEventDetails = async () => {
    try {
      const bearertoken = accessToken;
      const response = await fetch(
        `https://doros-wedding-server.onrender.com/events/${eventId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearertoken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network Response Not Okay");
      }
      const eventData = await response.json();

      const maximumBudget = eventData.budget;
      setMaxBudget(maximumBudget);
    } catch (error) {
      console.error("Error fetching event details", error);
    }
  };

  // Fetch data from an API
  const fetchData = async () => {
    try {
      const bearertoken = accessToken;
      const response = await fetch(
        `https://doros-wedding-server.onrender.com/events/${eventId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearertoken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network Response Not Okay");
      }
      const result = await response.json();
      setData(result.budgets);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchEventDetails();
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
      // convert the signed_contract to a boolean value
      editedItemCopy.contract_signed = editedItemCopy.contract_signed === "yes";

      console.log(editedItemCopy);
      const response = await fetch(
        `https://doros-wedding-server.onrender.com/budgets/${editItemId}`,
        {
          method: "PATCH", // patch to edit the budget items
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      deleteData(itemId);
    }
    setIsModalOpen(false);
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
      newItem.amount_paid = parseFloat(newItem.amount_paid);
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
    const newItem2 = {
      priority: event.target.priority.value,
      item: event.target.item.value,
      person_in_charge: event.target.person_in_charge.value,
      contract_signed: event.target.contract_signed.value === "yes",
      estimate_cost: event.target.estimate_cost.value,
      amount_paid: event.target.amount_paid.value,
      event_id: eventId,
      notes: event.target.notes.value,
    };
    console.log(newItem2);
    handleCreateItem(newItem2);
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
    <div>
      <div className="flex items-center px-[110px]">
        <div className="flex-1 border-b-2 border-black"></div>
        <div className="px-4 font-bold text-[30px] ">Budget</div>
        <div className="flex-1 border-b-2 border-black"></div>
      </div>

      <div className="flex justify-start gap-4 mt-8 ml-40">
        <div className="relative">
          <h1 className="bg-white p-4 absolute top-0 left-0 text-4xl font-bold">
            Your Budget
          </h1>
          <p className=" p-4 absolute top-12 left-0 text-l">
            Make a Cost Breakdown to Get your Budget Sorted Out
          </p>
          <div className="max-budget-bars-container flex mt-32 gap-10 ml-4">
            <div className="max-budget-bar w-32 h-32 mr-4">
              <CircularProgressbar
                value={calculateMaxBudgetPercentage()}
                text={`${calculateMaxBudgetPercentage()}%`}
                styles={buildStyles({
                  textSize: "16px",
                  pathTransitionDuration: 1,
                  pathColor:
                    totalAmount > maxBudget
                      ? "red"
                      : `rgba(0, 100, 0, ${
                          calculateMaxBudgetPercentage() / 100
                        })`,
                })}
              />

              <p className="ml-2">MaxBudget</p>

              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Maximum Budget"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(parseFloat(e.target.value))}
                  className="border rounded p-2 w-28 mt-2"
                />
              </div>
            </div>
            <div className="max-budget-bar w-32 h-32">
              <CircularProgressbar
                value={(totalAmount / maxBudget) * 100}
                text={`${(totalAmount / maxBudget) * 100}%`}
                styles={buildStyles({
                  textSize: "16px",
                  pathTransitionDuration: 1,
                  pathColor: `rgba(62, 152, 199, ${
                    calculateBudgetPercentage({
                      estimate_cost: maxBudget,
                      amount_paid: totalAmount,
                    }) / 100
                  })`,
                })}
              />
              <div className="mt-2 ml-4">Total Cost: {totalAmount}</div>
            </div>
          </div>
        </div>
        <button
          onClick={openAddBudgetModal}
          className="text-white p-2 rounded ml-auto mr-40 w-40 h-12 mt-4 bg-[#73332D]"
        >
          Add Budget
        </button>
      </div>
      {/* <hr class="h-px px-[110px] my-8 bg-gray-200 border-0 dark:bg-gray-700 mt-20"></hr> */}

      <div className="flex items-center mx-auto w-[85%] py-12 border-b-2 border-gray-200"></div>

      {/* Budget Table */}
      <div className=" p-6 mt-18">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-4">Budget Items</h1>
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
                  <tr key={item.id} className="cursor-pointer">
                    <td className="border px-4 py-2">{item.priority}</td>
                    <td className="border px-4 py-2">{item.item}</td>
                    <td className="border px-4 py-2">
                      {item.person_in_charge}
                    </td>
                    <td className="border px-4 py-2">
                      {calculateBudgetPercentage(item)}%
                    </td>
                    <td className="border px-4 py-2">{item.estimate_cost}</td>
                    <td className="border px-4 py-2">{item.amount_paid}</td>
                    <td className="border px-4 py-2">{item.contract_signed}</td>
                    <td className="border px-4 py-2">{item.notes}</td>
                    <td className="border px-4 py-2 ">
                      <button
                        onClick={() => handleEditItem(index)}
                        className="mr-2 bg-[#73332D] text-white text-sm font-semibold p-2 rounded "
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="ml-2 bg-[#73332D] text-white text-sm font-semibold p-2 rounded "
                      >
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
          <div className="fixed inset-0 flex items-center justify-end z-50 bg-black/70">
            <div className="modal-overlay" onClick={closeModal}></div>
            <div className="modal-container bg-white w-full h-full md:w-1/2 lg:w-1/3 md:max-h-screen lg:max-h-screen rounded shadow-lg p-4 right-0">
              {/* Modal content */}
              <h1 className="text-2xl font-bold mb-4">Edit Item</h1>
              <div>
                <label htmlFor="person_in_charge">Priority:</label>
                <input
                  type="text"
                  id="priority"
                  name="priority"
                  value={editedItem.priority}
                  onChange={(e) =>
                    setEditedItem({ ...editedItem, priority: e.target.value })
                  }
                  className="border rounded w-full py-2 px-3 mb-3"
                  placeholder="Enter Person In Charge"
                />
              </div>
              <div>
                <label htmlFor="person_in_charge">Item:</label>
                <input
                  type="text"
                  id="item"
                  name="item"
                  value={editedItem.item}
                  onChange={(e) =>
                    setEditedItem({ ...editedItem, item: e.target.value })
                  }
                  className="border rounded w-full py-2 px-3 mb-3"
                  placeholder="Enter Person In Charge"
                />
              </div>
              <div>
                <label htmlFor="person_in_charge">Person In Charge:</label>
                <input
                  type="text"
                  id="person_in_charge"
                  name="person_in_charge"
                  value={editedItem.person_in_charge}
                  onChange={(e) =>
                    setEditedItem({
                      ...editedItem,
                      person_in_charge: e.target.value,
                    })
                  }
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
                  value={editedItem.estimate_cost}
                  onChange={(e) =>
                    setEditedItem({
                      ...editedItem,
                      estimate_cost: e.target.value,
                    })
                  }
                  className="border rounded w-full py-2 px-3 mb-3"
                  placeholder="Enter Estimate Cost"
                />
              </div>
              <div>
                <label htmlFor="estimate_cost">Amount Paid:</label>
                <input
                  type="number"
                  id="amount_paid"
                  name="amount_paid"
                  value={editedItem.amount_paid}
                  onChange={(e) =>
                    setEditedItem({
                      ...editedItem,
                      amount_paid: e.target.value,
                    })
                  }
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
                value={editedItem.contract_signed ? "yes" : "no"}
                onChange={(e) =>
                  setEditedItem({
                    ...editedItem,
                    contract_signed: e.target.value === "yes",
                  })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="yes">yes</option>
                <option value="no">no</option>
              </select>
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4"
              >
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={editedItem.notes}
                onChange={(e) =>
                  setEditedItem({ ...editedItem, notes: e.target.value })
                }
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your thoughts here..."
              ></textarea>

              <div className="flex justify-start mt-4">
                <button
                  className=" bg-[#73332D] text-white p-2 rounded mr-2"
                  onClick={handleUpdateItem}
                >
                  Save
                </button>
                <button
                  className="bg-[#73332D] text-white p-2 rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {isAddBudgetModalOpen && (
          <div className="fixed inset-0 flex items-center justify-end z-50 bg-black/70">
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
                  <option value="">Choose an option</option>
                  <option value="yes">yes</option>
                  <option value="no">no</option>
                </select>

                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4"
                >
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                ></textarea>

                {/* Fields Added */}
                <div className="flex justify-start mt-4">
                  <button
                    type="submit"
                    className=" bg-[#73332D] text-white p-2 rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    className=" bg-[#73332D] text-white p-2 rounded"
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
    </div>
  );
};

export default Budget;
