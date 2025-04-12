import { Anchor, Box, Card, Flex, Table, Text } from '@mantine/core'
import React from 'react'

const Manager = () => {

  const data = [
    { sno: 1, project: 'AI Chatbot', teamname: 'Alpha Squad', teamlead: 'John Doe', status: 'In Progress' },
    { sno: 2, project: 'E-commerce Platform', teamname: 'Beta Team', teamlead: 'Jane Smith', status: 'Completed' },
    { sno: 3, project: 'Corporate Safety System', teamname: 'Gamma Force', teamlead: 'Alice Johnson', status: 'Pending' }
  ]
  const row = data.map((item)=>(
        <Table.Tr key={item.id} >
        <Table.Td>{item.sno}</Table.Td>
        <Table.Td>{item.project}</Table.Td>
        <Table.Td>{item.teamname}</Table.Td>
        <Table.Td>{item.teamlead}</Table.Td>
        <Table.Td>{item.status}</Table.Td>
      </Table.Tr>
      ))
  return (
    <Box>
      <Box>
        <Flex bg="blue" align="center" justify="space-between" px="40px" >
                  <Text c="#fff" size='20px' fw="500" >Manager panel</Text>
                  <Flex py="10px"  gap="50px" >
                  <Anchor
                        href="/manager"
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
                        <Text c="#fff" >Home</Text>
                        </Flex>
                      </Anchor>
                      <Anchor
                        href="/manager/report"
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
                        <Text c="#fff">Report an issue</Text>
                        </Flex>
                      </Anchor>
                  </Flex>
                 </Flex>
      </Box>
      <Table>
        <Table.Thead>
          <Table.Th>s.no</Table.Th>
          <Table.Th>Project</Table.Th>
          <Table.Th>Team name</Table.Th>
          <Table.Th>Team Lead</Table.Th>
          <Table.Th>Status</Table.Th>
        </Table.Thead>
        <Table.Tbody>
          {row}
        </Table.Tbody>
      </Table>
    </Box>
  )
}

export default Manager
