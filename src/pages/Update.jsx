import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from './userReducer'; 
import { useNavigate } from 'react-router-dom';


const Update = ({ userToEdit }) => { // Change 'itemToEdit' to 'userToEdit'
  const [user, setUser] = useState(userToEdit); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the action for updating the user with the new data
    dispatch(updateUser(user));

    // You can clear the input fields after submission if needed.
    setUser({ time: '', programItem: '', duration: '' });
    navigate('/planning-tools')
  };

  return (
    <div>
      <div>
        <h3>Update Item</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              name="time"
              value={user.time}
              onChange={(e) => setUser({ ...user, time: e.target.value })}
              className="form-control"
              placeholder="Enter Time"
            />
          </div>
          <div>
            <label htmlFor="programItem">Program Item:</label>
            <input
              type="text"
              name="programItem"
              value={user.programItem}
              onChange={(e) => setUser({ ...user, programItem: e.target.value })}
              className="form-control"
              placeholder="Enter Program Item"
            />
          </div>
          <br />
          <div>
            <label htmlFor="duration">Duration:</label>
            <input
              type="text"
              name="duration"
              value={user.duration}
              onChange={(e) => setUser({ ...user, duration: e.target.value })}
              className="form-control"
              placeholder="Enter Duration"
            />
          </div>
          <br />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Update;
