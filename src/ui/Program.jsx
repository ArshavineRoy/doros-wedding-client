import React, { Fragment, useState } from 'react';
import Data from './Data';
import { RiDeleteBinLine } from 'react-icons/ri';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdAddCircleOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Program = () => {
  const [items, setItems] = useState(Data);

  const handleEdit = (id, time, programItem, duration) => {
    localStorage.setItem('Time', time);
    localStorage.setItem('ProgramItem', programItem);
    localStorage.setItem('Duration', duration);
    localStorage.setItem('Id', id);
  };

  const handleDeleteClick = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  return (
    <Fragment>
      <div className="container mx-auto p-4 mt-20">
        <h1 className="text-3xl font-bold text-center mb-4">Event Program</h1>
        <div className="overflow-x-auto">
          <table className="w-full border border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border border-gray-300">Time</th>
                <th className="p-2 border border-gray-300">Program Item</th>
                <th className="p-2 border border-gray-300">Duration</th>
                <th className="p-2 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items && items.length > 0 ? (
                items.map((item, index) => (
                  <tr key={index} className="border- border-gray-300">
                    <td className="p-2 border border-gray-300 text-center">{item.Time}</td>
                    <td className="p-2 border border-gray-300 text-center">{item.ProgramItem}</td>
                    <td className="p-2 border border-gray-300 text-center">{item.Duration}</td>
                    <td className="p-2 border border-gray-300">
                      <div className="flex items-center justify-center">
                        <Link to={'/edit'}>
                          <button
                            className="bg-[#73332D] text-white text-sm font-semibold p-2 rounded mr-2"
                            onClick={() => handleEdit(item.id, item.Time, item.ProgramItem, item.Duration)}
                          >
                            <AiOutlineEdit />
                          </button>
                        </Link>
                        <button
                          className="bg-[#73332D] text-white text-sm font-semibold p-2 rounded"
                          onClick={() => handleDeleteClick(index)}
                        >
                          <RiDeleteBinLine />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-2 border border-gray-300 text-center">
                    No data available
                  </td>
                </tr>
              )}

              {/* Add Item Button at the start of the row */}
              <tr>
                <td colSpan="1" className="p-2 border border-gray-300 text-center">
                  <Link to="/create">
                    <button className="bg-[#73332D] text-white text-sm font-semibold p-2 rounded w-32 flex items-center justify-center">
                      <MdAddCircleOutline className="text-xl" /> <span>Add Item</span>
                    </button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default Program;
