import React, { useState } from 'react';
import Data from './Data';
import { Link, useNavigate } from 'react-router-dom';
import { MdAddCircleOutline } from 'react-icons/md';
import Modal from './Modal';


const AddItem = ({close}) => {
  const [time, setTime] = useState("");
  const [programItem, setProgramItem] = useState("");
  const [duration, setDuration] = useState("");

  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new item with the entered values and a unique ID
    const newItem = {
      id: Date.now(), // You can use a better way to generate IDs
      Time: time,
      ProgramItem: programItem,
      Duration: duration,
    };

    // Add the new item to the Data array
    Data.push(newItem);

    // Redirect back to the main program page
    history('/planning-tools');
  };

  return (
    <Modal close={close}>
    <div className="container mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold text-center mb-4">Add Program Item</h1>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-white p-4 rounded shadow-lg">
        <div className="mb-4">
          <label htmlFor="time" className="block font-medium">Time:</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:border-[#73332D]"
            />
        </div>

        <div className="mb-4">
          <label htmlFor="programItem" className="block font-medium">Program Item:</label>
          <input
            type="text"
            id="programItem"
            value={programItem}
            onChange={(e) => setProgramItem(e.target.value)}
            required
            className="w-full border-b border-gray-300 py-2 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="duration" className="block font-medium">Duration:</label>
          <input
            type="text"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            className="w-full border-b border-gray-300 py-2 focus:outline-none"
          />
        </div>

        <button className="bg-[#73332D] text-white text-sm font-semibold p-2 rounded mt-4 flex items-center">
  <MdAddCircleOutline className="text-xl mr-2" /> <span>Add Item</span>
  </button>
      </form>
      <Link to="/planning-tools" className="block text-center mt-4 text-[#73332D]">Back to Program</Link>
    </div>
    </Modal>
  );
};

export default AddItem;
