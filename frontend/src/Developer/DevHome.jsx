import React, { useState } from 'react';
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsFillBellFill,
} from 'react-icons/bs';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home({ uploadedFiles }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to filter documents based on search term
  const filteredDocuments = uploadedFiles.filter(doc =>
    doc.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>Developer Console</h3>
      </div>

      <div className='main-cards d-flex flex-column align-items-start'>
        <div className='card w-25'>
          <div className='card-inner'>
            <h3>Total Documents</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1>{uploadedFiles.length}</h1>
        </div>

        <div className='w-75 mt-3 d-flex align-items-center'>
          <input
            type="search"
            placeholder="Search Documents"
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-control me-2"
          />
          <button className='btn btn-success'>Search</button>
        </div>

        <div className="documents mt-3 w-75 h-75 rounded text-dark">
          <h3>Documents</h3>
          {filteredDocuments.length > 0 ? (
            <ul className="list-group mt-3 w-100 p-3">
              {filteredDocuments.map((doc, index) => (
                <li key={index} className="list-group-item">
                  {doc.fileName}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">No documents found</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default Home;