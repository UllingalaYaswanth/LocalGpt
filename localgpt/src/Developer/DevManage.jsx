import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';

const DevManage = () => {
  const [fileName, setFileName] = useState('');
  const [tags, setTags] = useState('');
  const [level, setLevel] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [displayedFiles, setDisplayedFiles] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [documents, setDocuments] = useState([
    { fileName: 'Document 1', tags: ['Tag1', 'Tag2'], level: 'Beginner' },
    { fileName: 'Document 2', tags: ['Tag3', 'Tag4'], level: 'Intermediate' },
    { fileName: 'Document 3', tags: ['Tag5', 'Tag6'], level: 'Advanced' }
  ]);
  const [selectedDocumentIndex, setSelectedDocumentIndex] = useState(null);

  useEffect(() => {
    // Filter files based on search term
    const filteredFiles = uploadedFiles.filter(file =>
      file.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      file.level.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayedFiles(filteredFiles);
  }, [uploadedFiles, searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFile = {
      fileName,
      tags: tags.split(',').map(tag => tag.trim()),
      level
    };
    setUploadedFiles([...uploadedFiles, newFile]);
    // Reset form
    setFileName('');
    setTags('');
    setLevel('');

    // Add search term to recent searches
    setRecentSearches([...recentSearches, searchTerm]);

    setSelectedDocumentIndex(null); // Deselect document after submission
  };

  const handleDelete = (index) => {
    const updatedDocuments = documents.filter((_, i) => i !== index);
    setDocuments(updatedDocuments);

    // Reset form state if the deleted document was selected
    if (index === selectedDocumentIndex) {
      setFileName('');
      setTags('');
      setLevel('');
      setSelectedDocumentIndex(null);
    }
  };

  const handleDocumentClick = (index) => {
    if (selectedDocumentIndex === index) {
      // Deselect if already selected
      setSelectedDocumentIndex(null);
      setFileName('');
      setTags('');
      setLevel('');
    } else {
      // Select the clicked document
      const selectedDoc = documents[index];
      setFileName(selectedDoc.fileName);
      setTags(selectedDoc.tags.join(', '));
      setLevel(selectedDoc.level);
      setSelectedDocumentIndex(index);
    }
  };

  return (
    <div className="body d-flex flex-column align-items-start ms-5">
      {/* Search input */}
      <input
        type="text"
        className="form-control mb-3 w-50"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Documents */}
      <div className="mt-3 w-50">
        <h5>Documents:</h5>
        <ul className="list-group">
          {documents.map((file, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
              onClick={() => handleDocumentClick(index)}
              style={{ cursor: 'pointer' }}
            >
              <div>
                <h6>{file.fileName}</h6>
                <p>Tags: {file.tags.join(', ')}</p>
                <p>Level: {file.level}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedDocumentIndex !== null && (
        <form onSubmit={handleSubmit} className="w-50 mt-4">
          <div className="mb-3">
            <label htmlFor="fileName" className="form-label">Rename Document</label>
            <input type="text" className="form-control" id="fileName" value={fileName} onChange={(e) => setFileName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="tags" className="form-label">Tags</label>
            <input type="text" className="form-control" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} required />
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
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary me-2">Submit</button>
            <button type="button" className="btn btn-danger" onClick={() => handleDelete(selectedDocumentIndex)}>Delete</button>
          </div>
        </form>
      )}
    <div className="mt-3 w-50">
    <h5>Saved documents:</h5>
      <div className="mt-5 w-50">
        <ul className="list-group">
          {displayedFiles.map((file, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>{file.fileName}</h5>
                <p>Tags: {file.tags.join(', ')}</p>
                <p>Level: {file.level}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default DevManage;
