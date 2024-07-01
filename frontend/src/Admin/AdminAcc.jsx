import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

const UserDetails = ({ user, searchHistory }) => (
  <div className="user-details-box mt-3">
    <table className="table table-striped">
      <thead>
        <tr>
          <th colSpan="2">User Details</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>User ID:</strong></td>
          <td>{user.user_id}</td>
        </tr>
        <tr>
          <td><strong>Email:</strong></td>
          <td>{user.username}</td>
        </tr>
        <tr>
          <td><strong>Level:</strong></td>
          <td>{user.level}</td>
        </tr>
        <tr>
          <td><strong>Role:</strong></td>
          <td>{user.role}</td>
        </tr>
      </tbody>
    </table>
    <div className="search-history-box mt-3">
      <div className="history-title"><strong>Search History:</strong></div>
      {searchHistory.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Query</th>
              <th>Documents Accessed</th>
            </tr>
          </thead>
          <tbody>
            {searchHistory.map((history, index) => (
              <tr key={index}>
                <td>{history.dateTime}</td>
                <td>{history.query}</td>
                <td>{history.documentsAccessed.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No search history available</div>
      )}
    </div>
  </div>
);

const AdminAcc = () => {
  const [showCreateGroupOptions, setShowCreateGroupOptions] = useState(false);
  const [showManageGroupsView, setShowManageGroupsView] = useState(false);
  const [username, setUsername] = useState('');
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [level, setLevel] = useState('');
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]); // State to hold fetched users
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  // Function to fetch users from server
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/fetch-users');
      setUsers(response.data); // Update users state with fetched data
      setFilteredUsers(response.data); // Initialize filtered users with all users
    } catch (error) {
      console.error('Error fetching users:', error);
      // Optionally display an error message to the user
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, []);

  const toggleCreateGroupOptions = () => {
    setShowCreateGroupOptions(!showCreateGroupOptions);
  };

  const handleManageGroupsClick = () => {
    setShowManageGroupsView(!showManageGroupsView);
    setSelectedUser(null); // Reset selected user when switching views
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/create-user', {
        username,
        userID,
        password,
        role,
        level
      });
      console.log(response.data);
      setSuccessMessage('User registered successfully!'); // Set success message
      fetchUsers(); // Refresh user list after creating a new user
    } catch (error) {
      console.error('Error creating user:', error);
      setSuccessMessage('Error registering user.'); // Set error message
    }

    setUsername('');
    setUserID('');
    setPassword('');
    setRole('user');
    setLevel('');
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setQuery(searchTerm);

    const filtered = users.filter((user) =>
      user.user_id.toLowerCase().includes(searchTerm) ||
      user.username.toLowerCase().includes(searchTerm) ||
      user.level.toString().includes(searchTerm) ||
      user.role.toLowerCase().includes(searchTerm)
    );
    setFilteredUsers(filtered);
  };

  const handleUserSelect = async (user) => {
    try {
      const response = await axios.get(`http://localhost:8081/user-details/${user.user_id}`);
      setSelectedUser(response.data); // Update selected user with details from server
      setSearchHistory(response.data.searchHistory); // Set search history from server response
    } catch (error) {
      console.error('Error fetching user details:', error);
      // Optionally display an error message to the user
    }
  };

  // Dummy search history function (for demonstration)
  const generateDummySearchHistory = () => {
    return [
      { dateTime: '2024-06-29 10:30', query: 'Search query 1', documentsAccessed: ['Document 1', 'Document 2'] },
      { dateTime: '2024-06-28 15:45', query: 'Search query 2', documentsAccessed: ['Document 3', 'Document 4'] }
    ];
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col">
          {!showManageGroupsView && !showCreateGroupOptions && (
            <h2 style={{ color: 'black' }}>Accounts</h2>
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
                  Create
                </button>
                <button
                  className="btn btn-secondary btn-lg"
                  style={{ width: '80%', backgroundColor: '#6c757d', borderColor: '#6c757d' }}
                  onClick={handleManageGroupsClick}
                >
                  Manage
                </button>
              </>
            )}
            {showCreateGroupOptions && (
              <div className="create-container d-flex flex-column justify-content-center align-items-center">
                <h2>Create</h2>
                <form onSubmit={handleSubmit} className="w-50">
                  {successMessage && <div className="alert alert-success">{successMessage}</div>}
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder='User name'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />

                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder='User ID'
                    value={userID}
                    onChange={(e) => setUserID(e.target.value)}
                    required
                  />

                  <input
                    type="password"
                    className="form-control mb-3"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <select
                    className="form-select mb-3"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="developer">Developer</option>
                  </select>

                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder='Level'
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                  />

                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <button
                  className="btn btn-secondary mt-3"
                  onClick={toggleCreateGroupOptions}
                >
                  Back
                </button>
              </div>
            )}
            {showManageGroupsView && (
              <div className="manage-container d-flex flex-column justify-content-center align-items-center ms-3" style={{ width: '100%' }}>
                <div>
                  <h2 className="text">Manage Users</h2>
                </div>
                <div className="search-container ">
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
                          {user.username}
                        </button>
                        {selectedUser && selectedUser.user_id === user.user_id && (
                          <UserDetails user={selectedUser} searchHistory={searchHistory} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  className="btn btn-secondary mt-3"
                  onClick={handleManageGroupsClick}
                >
                  Back
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAcc;
