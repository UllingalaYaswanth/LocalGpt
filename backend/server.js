import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'password',
    database: 'localgpt',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Dummy search history generator
const generateDummySearchHistory = () => {
    return [
        { dateTime: '2024-06-29 10:30', query: 'Search query 1', documentsAccessed: ['Document 1', 'Document 2'] },
        { dateTime: '2024-06-28 15:45', query: 'Search query 2', documentsAccessed: ['Document 3', 'Document 4'] }
    ];
};

// Endpoint for handling login
app.post('/login', async (req, res) => {
    const { uid, password } = req.body;
    const query = `SELECT * FROM login WHERE uid = ? AND password = ?`;
    try {
        const [result] = await pool.execute(query, [uid, password]);
        if (result.length > 0) {
            const user = result[0];
            res.json({ status: "success", role: user.role }); // Return role along with success status
        } else {
            res.status(401).json({ status: "error", message: "Invalid credentials" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Endpoint for handling user creation
app.post('/create-user', async (req, res) => {
    const { username, userID, password, role, level } = req.body;
    const query = 'INSERT INTO adm_acc_create (username, user_id, password, role, level) VALUES (?, ?, ?, ?, ?)';
    try {
        await pool.execute(query, [username, userID, password, role, level]);
        res.status(200).json({ message: 'User created successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Endpoint to fetch user details including dummy search history
app.get('/user-details/:userID', async (req, res) => {
    const userID = req.params.userID;
    console.log('Requested userID:', userID); // Log to verify userID received
    const userQuery = 'SELECT * FROM adm_acc_create WHERE user_id = ?';
    const history = generateDummySearchHistory(); // Generate dummy search history
    try {
      const [userResult] = await pool.execute(userQuery, [userID]);
      if (userResult.length > 0) {
        const user = userResult[0];
        res.json({ ...user, searchHistory: history });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      console.error('Error fetching user details:', err);
      res.status(500).json({ message: 'Failed to fetch user details' });
    }
  });
  

// Endpoint to fetch user accounts
app.get('/fetch-users', async (req, res) => {
    const query = 'SELECT * FROM adm_acc_create';
    try {
        const [rows] = await pool.query(query);
        res.json(rows); // Send the fetched user data as JSON response
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});


// Endpoint to fetch usernames from adm_acc_create for adm-group-create 
app.get('/fetch-users-names', async (req, res) => {
    const query = 'SELECT username FROM adm_acc_create';
    try {
        const [rows] = await pool.query(query);
        const usernames = rows.map(row => row.username);
        res.json(usernames); // Send an array of usernames as JSON response
    } catch (err) {
        console.error('Error fetching usernames:', err);
        res.status(500).json({ message: 'Failed to fetch usernames' });
    }
});

// Endpoint to insert groups-create
app.post('/create-group', async (req, res) => {
    try {
        const { groupName, users, documentTypes } = req.body;
        const query = 'INSERT INTO `adm_grp_create` (groupName, users, documentTypes) VALUES (?, ?, ?)';
        const [result] = await pool.execute(query, [groupName, JSON.stringify(users), JSON.stringify(documentTypes)]);
        const insertedGroupId = result.insertId; // Assuming `groups` table has an auto-incrementing `id` field

        res.status(200).json({ groupId: insertedGroupId });
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ error: 'Failed to create group' });
    }
});

// Endpoint to fetch groups
app.get('/fetch-groups', async (req, res) => {
    const query = 'SELECT * FROM adm_grp_create';
    try {
        const [rows] = await pool.query(query);
        res.json(rows); // Send the fetched groups data as JSON response
    } catch (err) {
        console.error('Error fetching groups:', err);
        res.status(500).json({ message: 'Failed to fetch groups' });
    }
});

// Endpoint to delete a group by ID
app.delete('/delete-group/:groupId', async (req, res) => {
    const groupId = req.params.groupId;
    const deleteQuery = 'DELETE FROM adm_grp_create WHERE id = ?';
    try {
        const [result] = await pool.execute(deleteQuery, [groupId]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Group deleted successfully' });
        } else {
            res.status(404).json({ message: 'Group not found' });
        }
    } catch (error) {
        console.error('Error deleting group:', error);
        res.status(500).json({ message: 'Failed to delete group' });
    }
});

// Endpoint to delete a user from a group
app.delete('/delete-user-from-group', async (req, res) => {
  const { groupId, username } = req.body;
  const deleteQuery = 'UPDATE adm_grp_create SET users = JSON_REMOVE(users, JSON_UNQUOTE(JSON_SEARCH(users, "one", ?))) WHERE id = ?';
  try {
      const [result] = await pool.execute(deleteQuery, [username, groupId]);
      if (result.affectedRows > 0) {
          res.status(200).json({ message: 'User deleted from group successfully' });
      } else {
          res.status(404).json({ message: 'User or Group not found' });
      }
  } catch (error) {
      console.error('Error deleting user from group:', error);
      res.status(500).json({ message: 'Failed to delete user from group' });
  }
});

// Endpoint to delete a document type from a group
app.delete('/delete-document-from-group', async (req, res) => {
  const { groupId, documentType } = req.body;
  const deleteQuery = 'UPDATE adm_grp_create SET documentTypes = JSON_REMOVE(documentTypes, JSON_UNQUOTE(JSON_SEARCH(documentTypes, "one", ?))) WHERE id = ?';
  try {
      const [result] = await pool.execute(deleteQuery, [documentType, groupId]);
      if (result.affectedRows > 0) {
          res.status(200).json({ message: 'Document deleted from group successfully' });
      } else {
          res.status(404).json({ message: 'Document or Group not found' });
      }
  } catch (error) {
      console.error('Error deleting document from group:', error);
      res.status(500).json({ message: 'Failed to delete document from group' });
  }
});
  
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
