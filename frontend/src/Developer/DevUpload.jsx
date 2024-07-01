import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';

const DevUpload = ({ onFileUpload }) => {
  const [files, setFiles] = useState([]);
  const [tags, setTags] = useState('');
  const [level, setLevel] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false); // State for upload success notification

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    const filesArray = Array.from(selectedFiles);
    setFiles(filesArray);
  };

  const handleRemoveFile = (fileName) => {
    const filteredFiles = files.filter(file => file.name !== fileName);
    setFiles(filteredFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataArray = files.map(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      formData.append('tags', tags);
      formData.append('level', level);
      return formData;
    });

    onFileUpload(formDataArray);

    setFiles([]);
    setTags('');
    setLevel('');
    setUploadSuccess(true); // Set upload success state to true

    setTimeout(() => {
      setUploadSuccess(false); // Reset upload success state after 3 seconds
    }, 3000);
  };

  return (
    
    <div className="body d-flex flex-column align-items-center justify-content-center">
      <form onSubmit={handleSubmit} className="w-50">
        {uploadSuccess && ( // Conditional rendering for upload success message
          <div className="alert alert-success mt-3" role="alert">
            Files uploaded successfully!
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="file" className="form-label">Upload Documents</label>
          <input type="file" className="form-control" id="file" onChange={handleFileChange} multiple required />
        </div>
      
        {files.length > 0 && (
          <div className="mb-3">
            <h5>Selected Files:</h5>
            <ul className="list-group">
              {files.map((file, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {file.name}
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => handleRemoveFile(file.name)}>
                    <FaTimes />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="tags" className="form-label">Tags</label>
          <input type="text" className="form-control" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="level" className="form-label">Level</label>
          <select className="form-select" id="level" value={level} onChange={(e) => setLevel(e.target.value)} required>
            <option value="">Select level</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
    </div>
  );
};

export default DevUpload;
