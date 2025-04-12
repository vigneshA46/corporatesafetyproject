import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Anchor,
  Box,
  Flex,
  Text,
  Table,
  Loader,
  Card,
  Stack,
} from '@mantine/core';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reports from API
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getreport');
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Table rows
  const rows = reports.map((report, index) => (
    <Table.Tr key={index}>
      <Table.Td>{report.email}</Table.Td>
      <Table.Td>{report.message}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Box>
      {/* Navbar */}
      <Flex bg="blue" align="center" justify="space-between" px="40px">
        <Text c="#fff" size="20px" fw="500">
          Reports
        </Text>
        <Flex py="10px" gap="50px">
          {['Home', 'Dashboard', 'Reports'].map((label, idx) => (
            <Anchor
              key={idx}
              href={`/admin${label === 'Home' ? '' : `/${label.toLowerCase()}`}`}
              underline={false}
              c="#000"
              sx={(theme) => ({
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.sm,
                color: theme.black,
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                '&:hover': {
                  backgroundColor: theme.colors.gray[2],
                },
              })}
            >
              <Flex>
                <Text c="#fff">{label}</Text>
              </Flex>
            </Anchor>
          ))}
        </Flex>
      </Flex>

      {/* Reports Table */}
      <Box p="40px">
        <Card shadow="sm" padding="lg" withBorder>
          <Stack>
            <Text size="lg" fw="600">
              Report List
            </Text>

            {loading ? (
              <Loader color="blue" />
            ) : reports.length === 0 ? (
              <Text>No reports found.</Text>
            ) : (
              <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead>
                    <Table.Th>Email</Table.Th>
                    <Table.Th>Message</Table.Th>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            )}
          </Stack>
        </Card>
      </Box>
    </Box>
  );
};

export default Reports;
