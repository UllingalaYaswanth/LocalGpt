import React, { useState, useEffect } from 'react';
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
          <td>{user.userId}</td>
        </tr>
        <tr>
          <td><strong>Email:</strong></td>
          <td>{user.email}</td>
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

const generateDummySearchHistory = () => [
  {
    dateTime: '2024-06-01 12:34:56',
    query: 'React hooks',
    documentsAccessed: ['document1.pdf', 'document2.pdf']
  },
  {
    dateTime: '2024-06-02 14:23:45',
    query: 'JavaScript ES6',
    documentsAccessed: ['document3.pdf', 'document4.pdf']
  },
  {
    dateTime: '2024-06-03 16:12:34',
    query: 'Bootstrap 5',
    documentsAccessed: ['document5.pdf', 'document6.pdf']
  }
];

const AdminAcc = () => {
  const [showCreateGroupOptions, setShowCreateGroupOptions] = useState(false);
  const [showManageGroupsView, setShowManageGroupsView] = useState(false);
  const [username, setUsername] = useState('');
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [level, setLevel] = useState('');
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([
    { id: 5, userId: 'neelu', email: 'neelu@example.com', level: 2, role: 'user' },
    { id: 4, userId: 'yash', email: 'yash@example.com', level: 1, role: 'user' },
    { id: 3, userId: 'ria', email: 'ria@example.com', level: 1, role: 'user' },
  ]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchHistory, setSearchHistory] = useState([]);

  const toggleCreateGroupOptions = () => {
    setShowCreateGroupOptions(!showCreateGroupOptions);
  };

  const handleManageGroupsClick = () => {
    setShowManageGroupsView(!showManageGroupsView);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ username, userID, password, role, level });

    setUsername('');
    setUserID('');
    setPassword('');
    setRole('');
    setLevel('');
  };

  useEffect(() => {
    if (selectedUser) {
      // Using dummy data for now
      setSearchHistory(generateDummySearchHistory());
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
                    <option value="user">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Developer</option>
                    <option value="user">User</option>
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
                          {user.userId}
                        </button>
                        {selectedUser && selectedUser.id === user.id && (
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
