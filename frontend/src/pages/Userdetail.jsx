import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Center, Flex, Loader, PasswordInput, Select, TextInput, Notification } from '@mantine/core';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const Userdetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");  // Added error message state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${id}`);
        setEmployee(response.data);
        setUsername(response.data.username);
        setPassword(response.data.password);
        setRole(response.data.role);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to fetch user data.");
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const deleteUser = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/delete/${id}`);
      alert("User deleted successfully!");
      navigate('/admin');  // Redirect to admin page after deletion
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  const editUser = async () => {
    if (!username || !password || !role) {
      alert("Please fill in all fields!");
      return;
    }

    const userData = {
      id: parseInt(id),
      username,
      password,
      role
    };

    setUpdating(true);

    try {
      const response = await axios.put(`http://localhost:3000/updateuser/`, userData);
      console.log("User updated:", response.data);
      setMessage("User updated successfully!");
      alert("Updated successfully!");
      setTimeout(() => setMessage(""), 3000);  // Clear success message after 3s
    } catch (error) {
      console.error("Failed to update user:", error);
      setError("Failed to update user. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <Card mx={250} mt={100} shadow="sm" padding="lg">
      <Center><b>Employee ID:</b> {employee?.id}</Center>
      
      {message && (
        <Notification color="green" title="Success" onClose={() => setMessage('')}>
          {message}
        </Notification>
      )}

      {error && (
        <Notification color="red" title="Error" onClose={() => setError('')}>
          {error}
        </Notification>
      )}

      <Box>
        <p style={{ fontSize: '15px', fontWeight: '600' }}>Username: <span style={{ fontWeight: '400' }}>{employee?.username}</span></p>
        <p style={{ fontSize: '15px', fontWeight: '600' }}>Password: <span style={{ fontWeight: '400' }}>{employee?.password}</span></p>
        <p style={{ fontSize: '15px', fontWeight: '600' }}>Role: <span style={{ fontWeight: '400' }}>{employee?.role}</span></p>
      </Box>

      <TextInput
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        mt="md"
      />

      <PasswordInput
        label="Password"
        placeholder="Enter password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
        mt="md"
      />

      <Select
        label="Role"
        value={role}
        onChange={setRole}
        data={["Admin", "Executive", "Manager", "Associate"]}
        required
        mt="md"
      />

      <Flex align='center' gap={5} justify='space-around' mt="md">
        <Button onClick={editUser} w={300} fullWidth disabled={updating}>
          {updating ? <Loader size="xs" color="white" /> : "Edit User"}
        </Button>
        <Button onClick={deleteUser} w={300} fullWidth mt="md" color="red">
          Delete User
        </Button>
        <Button w={300} onClick={() => navigate('/admin')} fullWidth mt="md">
          Back to Admin
        </Button>
      </Flex>
    </Card>
  );
};

export default Userdetail;
