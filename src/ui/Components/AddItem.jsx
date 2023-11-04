import React, { useState } from 'react';
import Data from '../Data';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal';

const AddItem = ({ close }) => {
  const [time, setTime] = useState("");
  const [programItem, setProgramItem] = useState("");
  const [duration, setDuration] = useState("");

  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    close();

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
    history('/dashboard/program');
  };

  return (
    <Modal close={close}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Add Program Item</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-4 rounded shadow-lg">
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
  <label htmlFor="programItem" className="block font-medium">
    Program Item:
  </label>
  <select
    id="programItem"
    value={programItem}
    onChange={(e) => setProgramItem(e.target.value)}
    required
    className="w-full border-b border-gray-300 py-2 focus:outline-none"
  >
    <option value="" disabled></option>
    <option value="BRIDE & BRIDESMAIDS' PREPARATION">BRIDE & BRIDESMAIDS' PREPARATION</option>
    <option value="BRIDE & BRIDESMAIDS' BREAKFAST & PHOTO SHOOT">BRIDE & BRIDESMAIDS' BREAKFAST & PHOTO SHOOT</option>
    <option value="GROOM AND GROOMSMEN'S PREPARATION">GROOM AND GROOMSMEN'S PREPARATION</option>
    <option value="WEDDING CEREMONY">WEDDING CEREMONY</option>
    <option value="WEDDING RECEPTION">WEDDING RECEPTION</option>
  </select>
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
              placeholder='Time it will take'
            />
          </div>
          <div className="flex justify-between">
          <button className="bg-[#73332D] text-white text-center text-sm font-semibold p-2 rounded w-24 h-12">
  <span>SAVE</span>
</button>
<button className="bg-[#73332D] text-white text-sm font-semibold p-2 rounded w-24 h-12" onClick={close}>
  CANCEL
</button>

</div>

        </form>
        
            </div>
    </Modal>
  );
};

export default AddItem;
