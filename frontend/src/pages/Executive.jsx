import React from 'react'
import {Anchor, Box,Flex,Table, Text} from '@mantine/core'

const Executive = () => {
  return (
    <Box>
      <Box>
        <Flex bg="blue" align="center" justify="space-between" px="40px" >
                  <Text c="#fff" size='20px' fw="500" >Executive panel</Text>
                  <Flex py="10px"  gap="50px" >
                  <Anchor
                        href="/executive"
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
                        href="/executive/report"
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
      <Table.Tr>
        <Table.Th>S.no</Table.Th>
        <Table.Th>Name</Table.Th>
        <Table.Th>Role</Table.Th>
        <Table.Th>Contact No</Table.Th>
        <Table.Th>No of Teams</Table.Th>
      </Table.Tr>
    </Table.Thead>
    <Table.Tbody>
      <Table.Tr  >
      <Table.Td>1</Table.Td>
      <Table.Td>Ramesh</Table.Td>
      <Table.Td>General manager</Table.Td>
      <Table.Td>9876543210</Table.Td>
      <Table.Td>5</Table.Td>
    </Table.Tr>
    </Table.Tbody>      
    </Table>
    </Box>
  )
}

export default Executive
