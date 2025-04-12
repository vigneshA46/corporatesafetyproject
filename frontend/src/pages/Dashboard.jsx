import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Title,
  Text,
  SimpleGrid,
  Table,
  Loader,
  Flex,
  Anchor,
  TextInput,
  Textarea,
  Button,
} from '@mantine/core';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#4dabf7', '#63e6be', '#ffa94d', '#e64980'];

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [to,setto] = useState("");
  const [subject,setsubject] = useState("");
  const [message,setmessage] = useState("");

  const sendemail = async () => {
    try {
      const res = await axios.post('http://localhost:3000/sendemail', {
        to,
        subject,
        text: message, // Use 'text' key to match the backend
      });
  
      setto("");
      setsubject("");
      setmessage("");
      alert('Mail sent successfully');
      return res.data;
  
    } catch (error) {
      console.error('Error while sending email:', error);
      alert('Failed to send email');
    }
  };
  

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/dashboarddata');
        setData(res.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading || !data) {
    return (
      <Box p="40px">
        <Loader />
      </Box>
    );
  }

  const { totalReports, employeesByRole, recentReports } = data;

  return (
    <Box p="80">
      <Flex align="center" justify="space-between" >
      <Title order={2} mb="lg">Admin Dashboard</Title>
      <Anchor href='/admin' ><Text>Back to admin</Text></Anchor>
      </Flex>
      

      {/* Summary Cards */}
      <SimpleGrid cols={4} spacing="lg" mb="xl">
        <Card shadow="sm" padding="md" withBorder>
          <Text size="sm" c="dimmed">Total Reports</Text>
          <Text size="xl" fw={700}>{totalReports}</Text>
        </Card>
        {employeesByRole.map((role, i) => (
          <Card key={role.role} shadow="sm" padding="md" withBorder>
            <Text size="sm" c="dimmed">{role.role}</Text>
            <Text size="xl" fw={700}>{role.count}</Text>
          </Card>
        ))}
      </SimpleGrid>

      {/* Pie Chart */}
      <Card withBorder shadow="sm" padding="md" mb="xl">
        <Text fw={600} mb="sm">Employees by Role</Text>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={employeesByRole}
              dataKey="count"
              nameKey="role"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {employeesByRole.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent Reports Table */}
      <Card withBorder shadow="sm" padding="md">
        <Text fw={600} mb="sm">Recent Reports</Text>
        <Table highlightOnHover withBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Username</Table.Th>
              <Table.Th>Message</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {recentReports.map((report, index) => (
              <Table.Tr key={index}>
                <Table.Td>{report.username}</Table.Td>
                <Table.Td>{report.message}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
      <Card withBorder mt="40px"  >
        <Text size='16px' fw="500" py="20px" >send an E-mail</Text>
        <TextInput value={to} onChange={(event)=>setto(event.target.value)} label="enter receiver's mail" placeholder='to' />
        <TextInput value={subject} onChange={(event)=>setsubject(event.target.value)} label="enter subject" placeholder='subject' />
        <Textarea value={message} onChange={(event)=>setmessage(event.target.value)} label="enter your message" placeholder='message' />
        <Button onClick={sendemail} mt="20px" >Send E-mail</Button>
      </Card>
    </Box>
  );
};

export default Dashboard;
