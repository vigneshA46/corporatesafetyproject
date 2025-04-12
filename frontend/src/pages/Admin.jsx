import React, { useEffect, useState } from 'react'
import {Anchor, Box, Button, Card, Flex, Stack, Table, Text, UnstyledButton} from '@mantine/core'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Admin = () => {

  const navigate = useNavigate();
  const adduser = ()=>{
      navigate('/userform')
  }

  const [data,setdata] = useState([]);

    useEffect(()=>{
      const userapi = async()=>{
        try{
          const response = await axios.get("http://localhost:3000/userdata");
          setdata(response.data);
        }
        catch(error){
          console.log(error.message);
        }

      }
      userapi();
    },[])

    const row = data.map((item)=>(
      <Table.Tr key={item.id} >
      <Table.Td>{item.id}</Table.Td>
      <Table.Td>{item.username}</Table.Td>
      <Table.Td>{item.password}</Table.Td>
      <Table.Td>{item.role}</Table.Td>
      <Table.Td><Button onClick={()=>navigate(`/admin/${item.id}`)} >View</Button></Table.Td>
    </Table.Tr>
    ))

  return (
  <Box align="center" justify="center" >
   <Flex bg="blue" align="center" justify="space-between" px="40px" >
    <Text c="#fff" size='20px' fw="500" >Admin panel</Text>
    <Flex py="10px"  gap="50px" >
    <Anchor
          href="/admin"
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
          href="/admin/dashboard"
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
          <Text c="#fff">Dashboard</Text>
          </Flex>
        </Anchor>
        <Anchor
          href="/admin/report"
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
          <Text c="#fff">Reports</Text>
          </Flex>
        </Anchor>
    </Flex>
   </Flex>
  <Box  mx={50} mt={30}>
  <Table>
    <Table.Thead>
      <Table.Tr  >
        <Table.Th>ID</Table.Th>
        <Table.Th>Username</Table.Th>
        <Table.Th>Password</Table.Th>
        <Table.Th>Role</Table.Th>
        <Table.Th>View</Table.Th>
      </Table.Tr>
    </Table.Thead>
    <Table.Tbody>{row}</Table.Tbody>
  </Table>
  </Box>
  <Flex  align="center" justify="space-around" >
  <Button mt={30} align="center" justify='center' onClick={adduser} >Add User</Button>
  </Flex>
  </Box>
  )
}

export default Admin
