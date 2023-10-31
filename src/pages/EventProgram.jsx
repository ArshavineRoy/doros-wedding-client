import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddCircleOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { deleteUser } from './userReducer'; // Import the deleteUser action

const EventProgram = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch(); // Get the dispatch function from Redux

  // Function to handle the delete action
  const handleDelete = (user) => {
    // Dispatch the deleteUser action with the user to be deleted
    dispatch(deleteUser(user));
  };

  return (
    <div className="text-black mt-10 md:mt-40">
      <h2 className="font-bold text-2xl md:text-3xl lg:text-2xl text-start">Morning Prep</h2>
      <div className="flex flex-col md:flex-row items-center justify-center">
        <Link to="/create" className="bg-[#73332D] text-white px-4 py-2 rounded flex items-center my-2 md:my-0">
          <MdAddCircleOutline className="mr-2" /> ADD ITEM
        </Link>
      </div>
      <div className="w-full flex items-center justify-center mt-4">
        <table className="w-11/12 md:w-3/4 border-collapse border mt-4">
          <thead>
            <tr>
              <th className="bg-gray-200 border px-4 py-2">Time</th>
              <th className="bg-gray-200 border px-4 py-2">Program Item</th>
              <th className="bg-gray-200 border px-4 py-2">Duration</th>
              <th className="bg-gray-200 border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.Time}</td>
                <td>{user.ProgramItem}</td>
                <td>{user.Duration}</td>
                <td>
                  <button
                    className="bg-[#73332D] text-white px-4 py-2 rounded flex items-center my-2 md:my-0"
                    onClick={() => handleDelete(user)} // Call handleDelete with the user
                  >
                    <MdAddCircleOutline className="mr-2" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventProgram;
