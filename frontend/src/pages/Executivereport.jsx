import React, { useState } from 'react';
import { Textarea, Button, Card, Title, Stack, Notification, Box, Text, Anchor, Flex } from '@mantine/core';
import axios from 'axios';

const Executivereport = () => {
  const [message, setMessage] = useState('');
  const email = "executive";

  const handleSubmit = async () => {
    try {
        const response = await axios.post('http://localhost:3000/report', {
          email,
          message,
        });
    
        console.log('Report submitted:', response.data);
        alert("report submited");
        setMessage("");
        return response.data;
      } catch (error) {
        console.error('Error submitting report:', error);
        alert("there is a issue in submiting report");
        throw error;
      }  };

  return (
    <Box>
        <Box w="100%" bg="blue" px="15px" py="10px" ><Text c="#fff" size="18px" fw="500"  > Report your issue</Text></Box>
    <Card mx="200px" my="100px" shadow="md" radius="md" p="lg" withBorder>
      <Stack spacing="md">
        <Title order={3}>Submit a Report</Title>
        <Textarea
          placeholder="Type your message here..."
          label="Your Report"
          minRows={4}
          value={message}
          onChange={(event) => setMessage(event.currentTarget.value)}
        />
        <Flex align="center" justify="space-around" >
        <Button onClick={handleSubmit}>
          Submit Report
        </Button>
        <Anchor  href='/executive' >
        <Button>
            Back to home
        </Button>
        </Anchor>
        </Flex>
      </Stack>
    </Card>
    </Box>
  );
};

export default Executivereport;
