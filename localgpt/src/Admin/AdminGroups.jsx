import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const AdminGroups = () => {
  const [showCreateGroupOptions, setShowCreateGroupOptions] = useState(false);
  const [groups, setGroups] = useState([
    { id: 1, name: 'Group 1', users: ['User A', 'User B'],
documentTypes: ['Document A', 'Document B'] },
    { id: 2, name: 'Group 2', users: ['User C', 'User D'],
documentTypes: ['Document C', 'Document D'] },
    { id: 3, name: 'Group 3', users: ['User E', 'User F'],
documentTypes: ['Document E', 'Document F'] },
  ]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedDocumentTypes, setSelectedDocumentTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showManageGroupsView, setShowManageGroupsView] = useState(false);
  const [documentTypeSearchTerm, setDocumentTypeSearchTerm] = useState('');

  const toggleCreateGroupOptions = () => {
    setShowCreateGroupOptions(!showCreateGroupOptions);
    setShowManageGroupsView(false); // Close Manage Groups view when
    setSelectedGroup(null); // Reset selected group when switching to
    setSelectedUsers([]); // Clear selected users
    setSelectedDocumentTypes([]); // Clear selected document types
  };

  const handleUserSelect = (e) => {
    const selectedUser = e.target.value;
    if (!selectedUsers.includes(selectedUser) && selectedUser !== '') {
      setSelectedUsers([...selectedUsers, selectedUser]);
    }
  };

  const handleRemoveUser = (user) => {
    setSelectedUsers(selectedUsers.filter(u => u !== user));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDocumentTypeSelect = (e) => {
    const selectedDocumentType = e.target.value;
    if (!selectedDocumentTypes.includes(selectedDocumentType) &&selectedDocumentType !== '') {
      setSelectedDocumentTypes([...selectedDocumentTypes,selectedDocumentType]);
    }
  };

  const handleRemoveDocumentType = (documentType) => {
    setSelectedDocumentTypes(selectedDocumentTypes.filter(d => d !==
documentType));
  };

  const handleDocumentTypeSearchChange = (e) => {
    setDocumentTypeSearchTerm(e.target.value);
  };

  const handleManageGroupsClick = () => {
    setShowManageGroupsView(true); // Show Manage Groups view
    setSelectedGroup(null); // Reset selected group
    setShowCreateGroupOptions(false); // Close Create Group options if open
    setSelectedUsers([]); // Clear selected users
    setSelectedDocumentTypes([]); // Clear selected document types
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setSelectedUsers(group.users);
    setSelectedDocumentTypes(group.documentTypes);
    setShowManageGroupsView(true); 

    setShowCreateGroupOptions(false); // Close Create Group options if open
  };

  const handleRemoveGroup = (group) => {
    // Filter out the group being removed
    const updatedGroups = groups.filter(g => g.id !== group.id);
    setGroups(updatedGroups);

    // If the removed group is the selected group, clear selections
    if (selectedGroup && selectedGroup.id === group.id) {
      setSelectedGroup(null);
      setSelectedUsers([]);
      setSelectedDocumentTypes([]);
    }
  };

  const handleBackToGroups = () => {
    setShowCreateGroupOptions(false);
    setShowManageGroupsView(false);
    setSelectedGroup(null);
    setSelectedUsers([]);
    setSelectedDocumentTypes([]);
  };

  const BackButton = (
    <button
      className="btn btn-secondary mb-3"
      style={{  backgroundColor: '#6c757d', borderColor: '#6c757d'}}
      onClick={handleBackToGroups}
    >
      Back
    </button>
  );

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          {!showManageGroupsView && !showCreateGroupOptions && (
            <h2 style={{ color: 'black' }}>Groups</h2>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="d-flex flex-column align-items-center" style={{ marginTop: '50px' }}>
            {!showCreateGroupOptions && !showManageGroupsView && (
              <>
                <button
                  className="btn btn-secondary btn-lg mb-3"
                  style={{ width: '80%', backgroundColor: '#6c757d', borderColor: '#6c757d' }}
                  onClick={toggleCreateGroupOptions}
                >
                  Create Group
                </button>
                <button
                  className="btn btn-secondary btn-lg"
                  style={{ width: '80%', backgroundColor: '#6c757d', borderColor: '#6c757d' }}
                  onClick={handleManageGroupsClick}
                >
                  Manage Groups
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {showCreateGroupOptions && (
        <div className="row mt-3">
          <div className="col">
            {BackButton}
            <h2 style={{ color: 'black' }}>Create Group</h2>
            <div className="create-group-options">
              <div className="form-group mt-3">
                <label htmlFor="groupName" className='ms-1 mb-1'>Group Name</label>
                <input type="text" className="form-control" id="groupName" placeholder="Enter group name" />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="userSelect" className='ms-1 mb-1'>Add Users</label>
                <select
                  className="form-control"
                  id="userSelect"
                  onChange={handleUserSelect}
                >
                  <option value="">Select user</option>
                  <option value="User 1">User 1</option>
                  <option value="User 2">User 2</option>
                  <option value="User 3">User 3</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="documentTypeSelect" className='ms-1 mb-1'>Add Document Type</label>
                <select
                  className="form-control"
                  id="documentTypeSelect"
                  onChange={handleDocumentTypeSelect}
                >
                  <option value="">Select document type</option>
                  <option value="Document 1">Document 1</option>
                  <option value="Document 2">Document 2</option>
                  <option value="Document 3">Document 3</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
            <button className='btn btn-success mt-4'>Create</button>
          </div>
        </div>
      )}
      {showManageGroupsView && (
        <div className="row mt-3">
          <div className="col">
            {BackButton}
            <h3 style={{ color: 'black' }}>Manage Groups</h3>
            <ul className="list-group">
              {groups.map(group => (
                <li
                  key={group.id}
                  className={`list-group-item ${selectedGroup === group ? 'active' : ''} d-flex justify-content-between align-items-center`}
                  onClick={() => handleGroupClick(group)}
                  style={{ cursor: 'pointer' }}
                >
                  {group.name}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveGroup(group);
                    }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {showManageGroupsView && selectedGroup !== null && (
        <div className="row mt-3">
          <div className="col">
            <h3 style={{ color: 'black' }}>{selectedGroup.name}</h3>
            <h5 style={{ color: 'black' }}>Users:</h5>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search users"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button">Search</button>
              </div>
            </div>
            <ul className="list-group">
              {selectedUsers
                .filter(user =>
                  user.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(user => (
                  <li key={user} className="list-group-item d-flex justify-content-between align-items-center"
                    style={{ cursor: 'pointer' }} // Cursor pointer for the user items
                  >
                    {user}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveUser(user)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
            </ul>
            <h5 className="mt-3"style={{ color: 'black' }}>Document Types:</h5>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search document types"
                value={documentTypeSearchTerm}
                onChange={handleDocumentTypeSearchChange}
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button">Search</button>
              </div>
            </div>
            <ul className="list-group">
              {selectedDocumentTypes
                .filter(docType => docType.toLowerCase().includes(documentTypeSearchTerm.toLowerCase())
                )
                .map(docType => (
                  <li key={docType} className="list-group-item d-flex justify-content-between align-items-center"
                    style={{ cursor: 'pointer' }} // Cursor pointer for the document type items
                  >
                    {docType}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveDocumentType(docType)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGroups;