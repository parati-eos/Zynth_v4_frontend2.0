import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Container,
  TablePagination,
} from '@mui/material';

const Dashboard = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false); // Auth status
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0); // Pagination page number
  const [rowsPerPage, setRowsPerPage] = useState(30); // Rows per page set to 30
  const [editedSources, setEditedSources] = useState({}); // State for tracking edited source fields

  // Simulate login with UserID and Password
  const handleLogin = () => {
    if (userId === 'admin' && password === 'password') {
      setAuthenticated(true);
    } else {
      alert('Invalid UserID or Password');
    }
  };

  // Fetch data from 'https://https://d7dd5hnsapl64.cloudfront.net/app1/users'
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://https://d7dd5hnsapl64.cloudfront.net/app1/users');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // Fetch data from 'http://localhost:5000/users/alluser'
  const fetchAllUsersData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://d7dd5hnsapl64.cloudfront.net/app1/users/alluser');
      setUsers(response.data.data); // Assuming response data is in the "data" key
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // Handle source field change
  const handleSourceChange = (userId, value) => {
    setEditedSources({ ...editedSources, [userId]: value });
  };

  // Handle saving the updated source value
  const handleSaveSource = async (userId) => {
    const updatedSource = editedSources[userId];
    if (updatedSource) {
      try {
        await axios.put('https://https://d7dd5hnsapl64.cloudfront.net/app1/users/source', {
          userId,
          source: updatedSource,
        });
        alert('Source updated successfully!');
        // Update the user data locally after successful API response
        const updatedUsers = users.map((user) => 
          user._id === userId ? { ...user, source: updatedSource } : user
        );
        setUsers(updatedUsers);
      } catch (error) {
        alert('Error updating source: ' + error.message);
      }
    }
  };

  // Pagination handler for page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Pagination handler for rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  // Display sliced rows based on current page and rows per page
  const displayedUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container>
      <h1>User Dashboard</h1>

      {!authenticated ? (
        // Login Form
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <h2>Login</h2>
          <TextField
            label="UserID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
            Login
          </Button>
        </Paper>
      ) : (
        // Show table, Fetch Data, and Check buttons only after login
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <Button variant="contained" color="primary" onClick={fetchData} fullWidth style={{ marginBottom: '10px' }}>
            Fetch Data
          </Button>
          <Button variant="contained" color="secondary" onClick={fetchAllUsersData} fullWidth>
            Check
          </Button>

          {loading && <div>Loading...</div>}
          {error && <div>Error: {error.message}</div>}

          {/* Increased table width with pagination */}
          <div style={{ overflowX: 'auto', marginTop: '20px' }}>
            <Table style={{ minWidth: '1200px' }} aria-label="user table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Latest Login</TableCell>
                  <TableCell>Source</TableCell>
                  <TableCell>PPT Count</TableCell>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Sign Up Link</TableCell>
                  <TableCell>User Country Name</TableCell>
                  <TableCell>User IP Country</TableCell>
                  <TableCell>Signup Time</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedUsers.length > 0 ? (
                  displayedUsers.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{new Date(user.latestLogin).toLocaleString()}</TableCell>
                      <TableCell>
                        <TextField
                          value={editedSources[user._id] || user.source || ''}
                          onChange={(e) => handleSourceChange(user._id, e.target.value)}
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>{user.pptCount}</TableCell>
                      <TableCell>{user.companyName || 'N/A'}</TableCell>
                      <TableCell>{user.sign_up_link || 'N/A'}</TableCell>
                      <TableCell>{user.user_country_name || 'N/A'}</TableCell>
                      <TableCell>{user.user_ipcountry || 'N/A'}</TableCell>
                      <TableCell>{user.signupTime || 'N/A'}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleSaveSource(user._id)}
                        >
                          Save
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={11} align="center">
                      No data to display. Click "Fetch Data" or "Check" to load the data.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination controls */}
          <TablePagination
            component="div"
            count={users.length} // Total number of rows
            page={page} // Current page
            onPageChange={handleChangePage} // Handle page change
            rowsPerPage={rowsPerPage} // Rows per page
            onRowsPerPageChange={handleChangeRowsPerPage} // Handle rows per page change
            rowsPerPageOptions={[30, 50, 100]} // Page size options
          />
        </Paper>
      )}
    </Container>
  );
};

export default Dashboard;
