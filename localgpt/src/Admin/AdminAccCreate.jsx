import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Corrected import path
import "../index.css";

const AdminCreate = () => {
  const [username, setUsername] = useState('');
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [level, setLevel] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
   
    console.log({ username, userID, password, role, level });
    
    setUsername('');
    setUserID('');
    setPassword('');
    setRole('');
    setLevel('');
  };

  return (
    <div className="create-container d-flex flex-column justify-content-center  align-items-center">
      <h2>Create</h2>
      <form onSubmit={handleSubmit} className="w-50">
      
        <input
          type="text"
          className="form-control mb-3"
          placeholder='User name'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="text"   
          className="form-control mb-3"
          placeholder='User ID'
          value={userID}
          onChange={(e) => setUserID(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select
          className="form-select mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="user">Select Role</option>
          <option value="admin">Administrator</option>
          <option value="moderator">Moderator</option>
          <option value="user">User</option>
        </select>

        <input
          type="text"
          className="form-control mb-3"
          placeholder='Level'
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />

        <button type="submit" className="btn btn-primary">Submit</button>
        
      </form>
    </div>
  );
};

export default AdminCreate;