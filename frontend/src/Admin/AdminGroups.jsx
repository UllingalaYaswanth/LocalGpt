import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminGroups = () => {
  const [showCreateGroupOptions, setShowCreateGroupOptions] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedDocumentTypes, setSelectedDocumentTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showManageGroupsView, setShowManageGroupsView] = useState(false);
  const [documentTypeSearchTerm, setDocumentTypeSearchTerm] = useState('');
  const [usersList, setUsersList] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [createSuccessMessage, setCreateSuccessMessage] = useState('');

  // Function to fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8081/fetch-users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsersList(data.map(user => user.username));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch groups from backend
  const fetchGroups = async () => {
    try {
      const response = await fetch('http://localhost:8081/fetch-groups');
      if (!response.ok) {
        throw new Error('Failed to fetch groups');
      }
      const data = await response.json();
      setGroups(data.map(group => ({
        id: group.id,
        name: group.groupName,
        users: group.users,
        documentTypes: group.documentTypes,
      })));
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  // Fetch groups when component mounts
  useEffect(() => {
    fetchGroups();
  }, []);

  const toggleCreateGroupOptions = () => {
    setShowCreateGroupOptions(!showCreateGroupOptions);
    setShowManageGroupsView(false);
    setSelectedGroup(null);
    setSelectedUsers([]);
    setSelectedDocumentTypes([]);
    setCreateSuccessMessage(''); // Reset success message when toggling options
  };

  const handleUserSelect = (e) => {
    const selectedUser = e.target.value;
    if (!selectedUsers.includes(selectedUser) && selectedUser !== '') {
      setSelectedUsers([...selectedUsers, selectedUser]);
    }
  };

  const handleRemoveUser = async (user) => {
    try {
      const response = await fetch(`http://localhost:8081/delete-user-from-group`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          groupId: selectedGroup.id,
          username: user,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      const updatedUsers = selectedUsers.filter(u => u !== user);
      setSelectedUsers(updatedUsers);

      if (selectedGroup) {
        const updatedGroup = {
          ...selectedGroup,
          users: updatedUsers,
        };
        setSelectedGroup(updatedGroup);

        const updatedGroups = groups.map(group =>
          group.id === selectedGroup.id ? updatedGroup : group
        );
        setGroups(updatedGroups);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDocumentTypeSelect = (e) => {
    const selectedDocumentType = e.target.value;
    if (!selectedDocumentTypes.includes(selectedDocumentType) && selectedDocumentType !== '') {
      setSelectedDocumentTypes([...selectedDocumentTypes, selectedDocumentType]);
    }
  };

  const handleRemoveDocumentType = async (documentType) => {
    try {
      const response = await fetch(`http://localhost:8081/delete-document-from-group`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          groupId: selectedGroup.id,
          documentType: documentType,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete document');
      }
      const updatedDocumentTypes = selectedDocumentTypes.filter(d => d !== documentType);
      setSelectedDocumentTypes(updatedDocumentTypes);

      if (selectedGroup) {
        const updatedGroup = {
          ...selectedGroup,
          documentTypes: updatedDocumentTypes,
        };
        setSelectedGroup(updatedGroup);

        const updatedGroups = groups.map(group =>
          group.id === selectedGroup.id ? updatedGroup : group
        );
        setGroups(updatedGroups);
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const handleDocumentTypeSearchChange = (e) => {
    setDocumentTypeSearchTerm(e.target.value);
  };

  const handleManageGroupsClick = () => {
    setShowManageGroupsView(true);
    setSelectedGroup(null);
    setShowCreateGroupOptions(false);
    setSelectedUsers([]);
    setSelectedDocumentTypes([]);
    setCreateSuccessMessage(''); // Reset success message when managing groups
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setSelectedUsers(group.users);
    setSelectedDocumentTypes(group.documentTypes);
    setShowManageGroupsView(true);
    setShowCreateGroupOptions(false);
    setCreateSuccessMessage(''); // Reset success message when selecting a group
  };

  const handleRemoveGroup = async (group) => {
    try {
      const response = await fetch(`http://localhost:8081/delete-group/${group.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete group');
      }
      const updatedGroups = groups.filter(g => g.id !== group.id);
      setGroups(updatedGroups);
      if (selectedGroup && selectedGroup.id === group.id) {
        setSelectedGroup(null);
        setSelectedUsers([]);
        setSelectedDocumentTypes([]);
      }
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  const handleBackToGroups = () => {
    setShowCreateGroupOptions(false);
    setShowManageGroupsView(false);
    setSelectedGroup(null);
    setSelectedUsers([]);
    setSelectedDocumentTypes([]);
    setCreateSuccessMessage(''); // Reset success message when going back to groups
  };

  const BackButton = (
    <button
      className="btn btn-secondary mb-3"
      style={{ backgroundColor: '#6c757d', borderColor: '#6c757d' }}
      onClick={handleBackToGroups}
    >
      Back
    </button>
  );

  const handleCreateGroup = async () => {
    try {
      const response = await axios.post('http://localhost:8081/create-group', {
        groupName,
        users: selectedUsers,
        documentTypes: selectedDocumentTypes,
      });
      console.log(response.data);
      setCreateSuccessMessage('Group created successfully!'); // Set success message
      toggleCreateGroupOptions(); // Hide create group options after success

      // Update groups state with the newly created group
      setGroups([
        ...groups,
        {
          id: response.data.groupId,
          name: groupName,
          users: selectedUsers,
          documentTypes: selectedDocumentTypes,
        }
      ]);
    } catch (error) {
      console.error('Error creating group:', error);
      setCreateSuccessMessage('Error creating group.'); // Set error message
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          {!showManageGroupsView && !showCreateGroupOptions && <h2 style={{ color: 'black' }}>Groups</h2>}
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
      {createSuccessMessage && (
        <div className="row mt-3">
          <div className="col">
            <div className="alert alert-success" role="alert">
              {createSuccessMessage}
            </div>
          </div>
        </div>
      )}
      {showCreateGroupOptions && (
        <div className="row mt-3">
          <div className="col">
            {BackButton}
            <h2 style={{ color: 'black' }}>Create Group</h2>
            <div className="create-group-options">
              <div className="form-group mt-3">
                <label htmlFor="groupName" className='ms-1 mb-1'>Group Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="groupName"
                  placeholder="Enter group name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="userSelect" className='ms-1 mb-1'>Add Users</label>
                <select
                  className="form-control"
                  id="userSelect"
                  onChange={handleUserSelect}
                >
                  <option value="">Select user</option>
                  {usersList.map((user, index) => (
                    <option key={index} value={user}>{user}</option>
                  ))}
                </select>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="documentTypeSelect" className='ms-1 mb-1'>Add Document</label>
                <select
                  className="form-control"
                  id="documentTypeSelect"
                  onChange={handleDocumentTypeSelect}
                >
                  <option value="">Select document </option>
                  <option value="Document 1">Document 1</option>
                  <option value="Document 2">Document 2</option>
                  <option value="Document 3">Document 3</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <button className='btn btn-success mt-4' onClick={handleCreateGroup}>Create</button>
            </div>
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
                  <span>{group.name}</span>
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
                  <li key={user} className="list-group-item d-flex justify-content-between align-items-center">
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
            <h5 className="mt-3" style={{ color: 'black' }}>Documents:</h5>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search documents"
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
                  <li key={docType} className="list-group-item d-flex justify-content-between align-items-center">
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
