import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from './userReducer';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [time, setTime] = useState('');
  const [programItem, setProgramItem] = useState('');
  const [duration, setDuration] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the addUser action with the input values
    dispatch(addUser({ time, programItem, duration }));
    navigate('/planning-tools');

    // Clear the input fields after submission
    setTime('');
    setProgramItem('');
    setDuration('');
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-md mx-auto">
        <h3 className="text-2xl font-semibold text-center mb-4">Add New Item</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="time" className="text-lg font-medium">Time:</label>
            <input
              type="time"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
              placeholder="Enter Time"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="programItem" className="text-lg font-medium">Program Item:</label>
            <input
              type="text"
              name="programItem"
              value={programItem}
              onChange={(e) => setProgramItem(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
              placeholder="Enter Program Item"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="duration" className="text-lg font-medium">Duration:</label>
            <input
              type="text"
              name="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
              placeholder="Enter Duration"
            />
          </div>
          <button type="submit" className="bg-[#73332D] text-white py-2 rounded hover:bg-[#52281C]">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
