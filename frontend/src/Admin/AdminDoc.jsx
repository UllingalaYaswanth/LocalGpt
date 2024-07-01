import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDoc = () => {
  const [query, setQuery] = useState('');
  const [files, setFiles] = useState([
    { name: 'document1.txt', date: '2024-06-21', time: '10:30 AM', level: 'High' },
    { name: 'document2.pdf', date: '2024-06-22', time: '11:00 AM', level: 'Medium' },
    { name: 'another_document.doc', date: '2024-06-23', time: '09:15 AM', level: 'Low' },
    { name: 'presentation.pptx', date: '2024-06-24', time: '02:45 PM', level: 'High' },
    { name: 'spreadsheet.xlsx', date: '2024-06-25', time: '03:30 PM', level: 'Medium' },
  ]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [filteredFiles, setFilteredFiles] = useState(files); // State to hold filtered documents

  const [history, setHistory] = useState([
    { person: 'Alice', date: '2024-06-21', time: '10:30 AM', query: 'document1' },
    { person: 'Bob', date: '2024-06-22', time: '11:00 AM', query: 'presentation' },
    { person: 'Charlie', date: '2024-06-23', time: '09:15 AM', query: 'spreadsheet' },
  ]);

  // Function to handle search based on query
  const handleSearch = () => {
    const trimmedQuery = query.trim().toLowerCase();
    if (trimmedQuery === '') {
      setFilteredFiles(files); // Reset to original files if query is empty
    } else {
      const filtered = files.filter(file =>
        file.name.toLowerCase().includes(trimmedQuery)
      );
      setFilteredFiles(filtered); // Update filtered files based on search query
    }
    setSelectedDocument(null); // Clear selected document on search
  };

  // Function to handle selecting a document
  const handleDocumentSelect = (document) => {
    setSelectedDocument(document);
  };

  // Function to handle actions on the selected document
  const handleFlagLevel = () => {
    // Implement logic for Flag Level action
    console.log(`Flag Level action for ${selectedDocument.name}`);
  };

  const handleRename = () => {
    if (!selectedDocument) return;

    // Prompt user for new name
    const newName = prompt(`Enter new name for ${selectedDocument.name}:`, selectedDocument.name);
    if (newName && newName !== selectedDocument.name) {
      // Update document name in files state
      const updatedFiles = files.map(file =>
        file.name === selectedDocument.name ? { ...file, name: newName } : file
      );
      setFiles(updatedFiles);
      setFilteredFiles(updatedFiles); // Update filtered files as well
      setSelectedDocument({ ...selectedDocument, name: newName }); // Update selected document to new name
    }
  };

  const handleBack = () => {
    // Implement logic for Back action
    console.log('Back button clicked');
    setSelectedDocument(null);
    setFilteredFiles(files);
  };

  // Render document details view
  if (selectedDocument) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <h2 className="text1">{selectedDocument.name}</h2>
              <div className="document-actions mt-3 mt-md-0">
                <button className="btn btn-secondary mb-2 mb-md-0 mr-md-2" onClick={handleBack} style={{ marginRight: '10px' }}>Back</button>
                <button className="btn btn-primary mb-2 mb-md-0 mr-md-2" onClick={handleFlagLevel} style={{ marginRight: '10px' }}>Flag Level</button>
                <button className="btn btn-secondary mb-2 mb-md-0 mr-md-2" onClick={handleRename}>Rename</button>
              </div>
            </div>
            <h3 className="history-heading">History</h3>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Person</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                  <th scope="col">Query</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.person}</td>
                    <td>{entry.date}</td>
                    <td>{entry.time}</td>
                    <td>{entry.query}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Default render: search and file list view
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <h2 className="text">My Documents</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="input-group mb-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a document..."
              className="form-control search-input"
              style={{ marginRight: '10px' }}
            />
            <div className="input-group-append">
              <button onClick={handleSearch} className="btn btn-primary" style={{ marginRight: '10px' }}>Search</button>
              <button className="btn btn-secondary">Filter</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="file-list">
            {/* Display list of filtered files in a table */}
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Document Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                  <th scope="col">Level</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file, index) => (
                  <tr key={index} onClick={() => handleDocumentSelect(file)} style={{ cursor: 'pointer' }}>
                    <td>{file.name}</td>
                    <td>{file.date}</td>
                    <td>{file.time}</td>
                    <td>{file.level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDoc;
