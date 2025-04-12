import { useState } from "react";
import { TextInput, Button, Card } from "@mantine/core";

export default function ProfilePage() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");

  return (
    <Card shadow="sm" padding="lg">
      <h2 className="text-lg font-bold mb-2">My Profile</h2>
      <TextInput label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <TextInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required mt="md" />
      <Button fullWidth mt="md">Update Profile</Button>
    </Card>
  );
}
