import { useState } from "react";
import { TextInput, Select, Button, Card, PasswordInput, Box, Flex } from "@mantine/core";
import { useNavigate } from "react-router-dom";
export default function UserForm() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const backtoadmin = ()=>{
    navigate('/admin');
  }

  const handleSubmit = async() => {
    const userData = {username,password,role};

    try {
      const response = await fetch("http://localhost:3000/api/signup",{
        method : "POST",
        headers :{"Content-Type":"application/json"},
        body:JSON.stringify(userData)
      });
      if(response.ok) {
        const result = await response.json();
        console.log("User registered:", result);
        setusername("");
        setpassword("");
        setRole("");
        alert("user added succesfully");
      }
      else{
        console.error("signup failed")
      }

    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <Card mx={250} mt={100} shadow="sm" padding="lg">
      <h2 className="text-lg font-bold mb-2">Add user</h2>
      
      <TextInput label="Name" value={username} onChange={(e) => setusername(e.target.value)} required />
      <PasswordInput
      label="password"
      placeholder="enter password"
      value = {password}
      onChange={(event)=>setpassword(event.target.value)}
    />      
      <Select
        label="Role"
        value={role}
        onChange={setRole}
        data={["Admin", "Executive", "Manager","Associate"]}
        mt="md"
      />
      <p>{username}{password}{role}</p>
      <Flex align='center' justify='space-around' >
      <Button w={300} onClick={handleSubmit} fullWidth mt="md">
        Add user
      </Button>
      <Button w={300}  onClick={backtoadmin} >Back to Admin</Button>
      </Flex>
    </Card>
  );
}
