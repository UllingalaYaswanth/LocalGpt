import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';

const DevUpload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [tags, setTags] = useState('');
  const [level, setLevel] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFile = {
      file,
      fileName,
      tags: tags.split(',').map(tag => tag.trim()),
      level
    };
    setUploadedFiles([...uploadedFiles, newFile]);
    // Reset form
    setFile(null);
    setFileName('');
    setTags('');
    setLevel('');
  };

  return (
    <div className="body d-flex flex-column align-items-start ms-5 justify-content-center">
      <form onSubmit={handleSubmit} className="w-50">
        <div className="mb-3">
          <label htmlFor="file" className="form-label">Upload Document</label>
          <input type="file" className="form-control" id="file" onChange={handleFileChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="fileName" className="form-label">Rename Document (optional)</label>
          <input type="text" className="form-control" id="fileName" value={fileName} onChange={(e) => setFileName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">Tags</label>
          <input type="text" className="form-control" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="level" className="form-label">Level</label>
          <select className="form-select" id="level" value={level} onChange={(e) => setLevel(e.target.value)} required>
            <option value="">Select level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>

      <div className="mt-5 w-50">
        <ul className="list-group">
          {uploadedFiles.map((file, index) => (
            <li key={index} className="list-group-item">
              <h5>{file.fileName}</h5>
              <p>Tags: {file.tags.join(', ')}</p>
              <p>Level: {file.level}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DevUpload;