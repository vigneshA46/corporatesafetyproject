import { useState } from "react";
import { TextInput, PasswordInput, Button, Card, Title, Text, Select } from "@mantine/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("admin");
    const [error, setError] = useState("");
    const [responseData, setResponseData] = useState(""); // To store API response
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Reset error message
        setResponseData(""); // Clear previous response

        try {
            // Send the login credentials to backend
            const response = await axios.post("http://localhost:3000/login", {
                username,
                password,
                role,
            });
            // Save ID to localStorage
            localStorage.setItem("userId", response.data.userid);

            // On successful login, save the token in localStorage
            const token = response.data.token;
            localStorage.setItem("token", token);

            // Navigate based on the role received
            navigate(`/${response.data.role}`);
            console.log("Login successful", response.data.role);
            setResponseData(response.data.message); // Store success message
        } catch (err) {
            console.error("Login failed:", err.response?.data?.error || "Server error");
            setError(err.response?.data?.error || "Invalid credentials");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f5f5f5" }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: 350 }}>
                <Title order={2} align="center" mb="md">
                    Login
                </Title>
                {/* Username Input */}
                <TextInput
                    label="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Enter username"
                />
                {/* Password Input */}
                <PasswordInput
                    label="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter password"
                />
                {/* Role Select */}
                <Select
                    label="Role"
                    value={role}
                    onChange={(value) => setRole(value)}
                    placeholder="Select role"
                    data={["associate", "manager", "executive", "admin"]}
                />
                {/* Error Message */}
                {error && <Text color="red" size="sm">{error}</Text>}
                {/* Success Message */}
                {responseData && <Text color="green" size="sm">{responseData}</Text>}

                {/* Login Button */}
                <Button my={20} onClick={handleLogin}>Login</Button>
            </Card>
        </div>
    );
}
