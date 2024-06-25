import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

const UserDetails = ({ user, searchHistory }) => (
  <div className="user-details-box mt-3">
    <div className="user-detail"><strong>User ID:</strong> {user.userId}</div>
    <div className="user-detail"><strong>Email:</strong> {user.email}</div>
    <div className="user-detail"><strong>Level:</strong> {user.level}</div>
    <div className="user-detail"><strong>Role:</strong> {user.role}</div>
    <div className="search-history-box mt-3">
      <div className="history-title"><strong>Search History:</strong></div>
      {searchHistory.length > 0 ? (
        searchHistory.map((history, index) => (
          <div key={index} className="user-detail" style={{ border: '1px solid #ccc', padding: '5px', marginTop: '5px' }}>
            <strong>Date & Time:</strong> {history.dateTime} | 
            <strong>Query:</strong> {history.query} | 
            <strong>Documents Accessed:</strong> {history.documentsAccessed.join(', ')}
          </div>
        ))
      ) : (
        <div>No search history available</div>
      )}
    </div>
  </div>
);

const AdminManage = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([
    { id: 5, userId: 'neelu', email: 'neelu@example.com', level: 2, role: 'user' },
    { id: 4, userId: 'yash', email: 'yash@example.com', level: 1, role: 'user' },
    { id: 3, userId: 'ria', email: 'ria@example.com', level: 1, role: 'user' },
  ]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const fetchUserSearchHistory = async (userId) => {
      try {
        const response = await fetch(`API_ENDPOINT/searchHistory/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer YOUR_AUTH_TOKEN',
          },
        });
        const searchData = await response.json();
        setSearchHistory(searchData);
      } catch (error) {
        console.error('Error fetching user search history:', error);
      }
    };

    if (selectedUser) {
      fetchUserSearchHistory(selectedUser.id);
    }
  }, [selectedUser]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setQuery(searchTerm);

    const filtered = users.filter((user) =>
      user.userId.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.level.toString().includes(searchTerm) ||
      user.role.toLowerCase().includes(searchTerm)
    );
    setFilteredUsers(filtered);
  };

  const handleUserSelect = (user) => {
    setSelectedUser((prevUser) => (prevUser && prevUser.id === user.id ? null : user));
  };

  return (
    <div className="manage-container d-flex flex-column justify-content-center align-items-center">
      <div>
        <h2 className="text">Manage Users</h2>
      </div>
      <div className="search-container">
        <div className="input-group mb-3 center">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search user"
            className="form-control search-input"
          />
          <div className="input-group-append">
            <button className="btn btn-primary search-button">Search</button>
            <button className="btn btn-secondary filter-button ms-2">Filter</button>
          </div>
        </div>
        <div className="user-list mt-3 d-flex flex-column align-items-start w-100 text-left">
          {filteredUsers.map((user, index) => (
            <div key={index} className="w-100">
              <button
                onClick={() => handleUserSelect(user)}
                className="btn btn-outline-primary user-button mb-2 w-100"
              >
                {user.userId}
              </button>
              {selectedUser && selectedUser.id === user.id && (
                <UserDetails user={selectedUser} searchHistory={searchHistory} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminManage;
