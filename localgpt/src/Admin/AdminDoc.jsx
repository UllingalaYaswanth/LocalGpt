import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'


const AdminDoc = () => {
  const [query, setQuery] = useState('');
  const [files, setFiles] = useState([
    'document1.txt',
    'document2.pdf',
    'another_document.doc',
    'presentation.pptx',
    'spreadsheet.xlsx',
  ]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [filteredFiles, setFilteredFiles] = useState(files); 


  const [history, setHistory] = useState([
    { person: 'Alice', date: '2024-06-21', time: '10:30 AM', query:
'document1' },
    { person: 'Bob', date: '2024-06-22', time: '11:00 AM', query:
'presentation' },
    { person: 'Charlie', date: '2024-06-23', time: '09:15 AM', query:
'spreadsheet' },
  ]);

  // Function to handle search based on query
  const handleSearch = () => {
    const trimmedQuery = query.trim().toLowerCase();
    if (trimmedQuery === '') {
      setFilteredFiles(files); // Reset to original files if query is empty
    } else {
      const filtered = files.filter(file =>
        file.toLowerCase().includes(trimmedQuery)
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
    console.log(`Flag Level action for ${selectedDocument}`);
  };

  const handleRename = () => {
    if (!selectedDocument) return;

    // Prompt user for new name
    const newName = prompt(`Enter new name for ${selectedDocument}:`,
selectedDocument);
    if (newName && newName !== selectedDocument) {
      // Update document name in files state
      const updatedFiles = files.map(file =>
        file === selectedDocument ? newName : file
      );
      setFiles(updatedFiles);
      setFilteredFiles(updatedFiles); // Update filtered files as well
      setSelectedDocument(newName); // Update selected document to new name
    }
  };

  // Render document details view
  if (selectedDocument) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="text1">{selectedDocument}</h2>
              <div className="document-actions">
                <button className="btn btn-primary" style={{marginRight: '10px' }} onClick={handleFlagLevel}>Flag Level</button>
                <button className="btn btn-secondary" onClick={handleRename}>Rename</button>
              </div>
            </div>
            <h3 className="history-heading">History</h3>
            <div className="history-list">
              {history.map((entry, index) => (
                <div key={index} className="history-item">
                  <p><strong>Person:</strong> {entry.person}</p>
                  <p><strong>Date:</strong> {entry.date}</p>
                  <p><strong>Time:</strong> {entry.time}</p>
                  <p><strong>Query:</strong> {entry.query}</p>
                </div>
              ))}
            </div>
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
          <div className="input-group mb-3 p-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a document..."
              className="form-control search-input"
              style={{ marginRight: '10px' }}
            />
            <button onClick={handleSearch} className="btn btn-primary" style={{ marginRight: '10px' }}>Search</button>
            <button className="btn btn-secondary p-3 h-1">Filter</button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="file-list">
            {/* Display list of filtered files */}
            {filteredFiles.map((file, index) => (
              <div key={index} onClick={() =>handleDocumentSelect(file)} className="list-group-item file-item">
                {file}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDoc;