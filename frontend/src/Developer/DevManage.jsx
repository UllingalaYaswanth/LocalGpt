import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';

const DevManage = ({ uploadedFiles, setUploadedFiles }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedFiles, setDisplayedFiles] = useState([]);

  useEffect(() => {
    const filteredFiles = uploadedFiles.filter(file =>
      file.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(file.tags) && file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      file.level.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayedFiles(filteredFiles);
  }, [uploadedFiles, searchTerm]);

  const handleDelete = async (fileName) => {
    try {
      const response = await fetch(`http://localhost:8081/delete/${fileName}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUploadedFiles(uploadedFiles.filter(file => file.fileName !== fileName));
      } else {
        console.error('Delete failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <div className="body d-flex flex-column align-items-center">
      <input
        type="text"
        className="form-control mb-3 w-75"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="mt-3 w-75">
        <h5 className="text-center">Documents:</h5>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">File Name</th>
                <th scope="col">Tags</th>
                <th scope="col">Level</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedFiles.map((file, index) => (
                <tr key={index}>
                  <td>
                    <a href={`http://localhost:8081/uploads/${file.filePath}`} target="_blank" rel="noopener noreferrer">
                      {file.fileName}
                    </a>
                  </td>
                  <td>{Array.isArray(file.tags) ? file.tags.join(', ') : 'No tags'}</td>
                  <td>{file.level}</td>
                  <td>
                    <button onClick={() => handleDelete(file.fileName)} className="btn btn-danger btn-sm">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DevManage;