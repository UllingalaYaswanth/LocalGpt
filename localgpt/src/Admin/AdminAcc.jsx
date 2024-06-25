import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"; 

const AdminAcc = () => {
  const handleCreate = () => {
    console.log('Creating an account...');
  };

  const handleManage = () => {
    console.log('Managing account...');
  };

  return (
    <div className="container d-flex flex-column align-items-start">
      <div className="row justify-content-center align-items-center mb-4">
        {/* Accounts heading */}
        <h5 className="">Accounts:</h5>

        {/* Button container row-wise */}
        <div className="button-container d-flex flex-row">
          <Link to="/AdminAccCreate">
            <button className="btn btn-primary me-3" onClick={handleCreate}>Create</button>
          </Link>
          <Link to="/AdminAccManage">
          <button className="btn btn-secondary me-3" onClick={handleManage}>Manage</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminAcc;