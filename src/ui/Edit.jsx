import React, { useState, useEffect } from "react";
import Data from "./Data";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "./Modal";

const Edit = ({ close }) => {
  const { id } = useParams();
  const [time, setTime] = useState("");
  const [programItem, setProgramItem] = useState("");
  const [duration, setDuration] = useState("");
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    close();

    // Update the program item in the data
    const updatedData = Data.map((item) => {
      if (item.id === parseInt(id)) {
        return {
          ...item,
          Time: time,
          ProgramItem: programItem,
          Duration: duration,
        };
      }
      return item;
    });

    // Update the data and redirect back to the main program page
    updateData(updatedData);
    history("/planning-tools");
  };

  const updateData = (updatedData) => {
    // Replace this with a function to update your data, you can use Redux, context, or other state management approaches.
    // For example:
    // setData(updatedData);
  };

  useEffect(() => {
    // Find the program item data based on the provided ID
    const program = Data.find((item) => item.id === parseInt(id));

    if (program) {
      setTime(program.Time);
      setProgramItem(program.ProgramItem);
      setDuration(program.Duration);
    }
  }, [id]);

  return (
    <Modal close={close}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">
          Edit Program Item
        </h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white p-4 rounded shadow-lg"
        >
          <div className="mb-4">
            <label htmlFor="time" className="block font-medium">
              Time:
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:border-[#73332D]"
              placeholder="Time"
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
              <option value="Option 1">BRIDE & BRIDESMAIDS' PREPARATION</option>
              <option value="Option 2">
                BRIDE & BRIDESMAIDS' BREAKFAST & PHOTO SHOOT
              </option>
              <option value="Option 3">
                GROOM AND GROOMSMEN'S PREPARATION
              </option>
              <option value="Option 4">WEDDING CEREMONY</option>
              <option value="Option 5">WEDDING RECEPTION</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="duration" className="block font-medium">
              Duration:
            </label>
            <input
              type="text"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              className="w-full border-b border-gray-300 py-2 focus:outline-none"
              placeholder="Time it will take"
            />
          </div>

          <div className="flex justify-between">
            <button className="bg-[#73332D] text-white text-center text-sm font-semibold p-2 rounded w-24 h-12">
              <span>SAVE</span>
            </button>
            <button
              className="bg-[#73332D] text-white text-sm font-semibold p-2 rounded w-24 h-12"
              onClick={close}
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default Edit;
