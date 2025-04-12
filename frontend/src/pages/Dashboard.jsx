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
    <Box p="40px">
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
          <thead>
            <tr>
              <th>Username</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {recentReports.map((report, index) => (
              <tr key={index}>
                <td>{report.username}</td>
                <td>{report.message}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Box>
  );
};

export default Dashboard;
