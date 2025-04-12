import { useState } from "react";
import { Table, Button, TextInput, Select } from "@mantine/core";

const usersData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Alice Smith", email: "alice@example.com", role: "Employee" },
];

export default function UserManagement() {
  const [users, setUsers] = useState(usersData);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8" style={{display:'flex',flexDirection:'column',width:'50%',alignItems:'center',justifyContent:'center'}} >
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      
      <TextInput 
        placeholder="Search users..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        mb="md"
      />
      
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button color="blue" size="xs" mr="sm">Edit</Button>
                <Button color="red" size="xs">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
