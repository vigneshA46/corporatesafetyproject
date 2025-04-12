import { useState } from "react";
import { TextInput, PasswordInput, Button, Card, Title, Text, Select } from "@mantine/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [isAuthenticated,setisAuthenticated] = useState(false);
    const [username,setusername] = useState("");
    const [password,setpassword] = useState("");
    const [role,setrole] = useState("admin");
    const [error,seterror] = useState("");
    const [responseData, setResponseData] = useState(""); // To store API response
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
      seterror("");
      setResponseData(""); // Clear previous response

      try {
          const response = await axios.post("http://localhost:3000/login", {
              username,
              password,
              role,
          });

          navigate(`/${response.data.role}`);
          console.log("Login successful", response.data.role);
          setResponseData(response.data.message); // Store success message
      } catch (err) {
          console.error("Login failed:", err.response?.data?.error || "Server error");
          seterror(err.response?.data?.error || "Invalid credentials");
      }
  };


  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f5f5f5" }}>
      <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: 350 }}>
        <Title order={2} align="center" mb="md">
          Login
        </Title>
        <TextInput label='username' value={username} onChange={(event)=>setusername(event.target.value)} placeholder="enter username" />
        <TextInput label='password' value={password} onChange={(event)=>setpassword(event.target.value)} placeholder="enter passoword" type="password" />
        <Select label="role" value={role}   onChange={(value) => setrole(value)}  placeholder="select role" data={['associate','manager','executive','admin']} />
      <Button my={20} onClick={handleLogin} >Login</Button>
      </Card>
    </div>
  );
}
