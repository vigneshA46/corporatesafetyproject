import React from 'react'
import {Anchor, Box, Button, Flex, Table, Text} from '@mantine/core'
import LocationTracker from '../../components/LocationTracker';
import { usesosAlarm } from '../../components/usesosAlarm';
import { useState } from 'react';
import { disasternotification } from '../../components/disasternotification';
import axios from 'axios';
const Associate = () => {
  const userId = localStorage.getItem("userId");
  const {playAlarm , stopAlarm} = usesosAlarm();
  const [isAlarmActive, setIsAlarmActive] = useState(false);  
   const handleClick = () => {
      if (isAlarmActive) {
        stopAlarm();
      } else {
        playAlarm();
        disasternotification("Urgent : I got an emrgency save my soul");
        axios.post("http://localhost:3000/send-sos-mail",{       
  subject: "SOS Alert",
  message: "Emergency : SOS alert Save our souls",
  id: userId
        })
      }
      setIsAlarmActive((prev) => !prev);
    };
  return (
    <Box  >
      {/* Location tracking runs silently */}
      {userId && <LocationTracker userId={userId} />}
      <Flex bg="blue" align="center" justify="space-between" px="40px" >
          <Text c="#fff" size='20px' fw="500" >Associate panel</Text>
          <Flex py="10px"  gap="50px" >
          <Anchor
                href="/associate"
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
                href="/associate/report"
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
      <Button
        c={isAlarmActive ? "red" : "orange"}
        onClick={handleClick}
        size="sm"
        radius="md"
        variant="filled"
        bg="#fff"
        >
      {isAlarmActive ? "Stop SOS" : "SOS emergency"}
    </Button>        
       </Flex>
         </Flex>
         <Table>
  <Table.Thead>
    <Table.Tr>
      <Table.Th>S.no</Table.Th>
      <Table.Th>Project Name</Table.Th>
      <Table.Th>Duration</Table.Th>
      <Table.Th>Team Name</Table.Th>
      <Table.Th>No of Members</Table.Th>
      <Table.Th>Status</Table.Th>
    </Table.Tr>
  </Table.Thead>

  <Table.Tbody>
    <Table.Tr>
      <Table.Td>1</Table.Td>
      <Table.Td>Scorpio-x</Table.Td>
      <Table.Td>3 Months</Table.Td>
      <Table.Td>Challenger Deep</Table.Td>
      <Table.Td>8 People</Table.Td>
      <Table.Td>In Progress</Table.Td>
    </Table.Tr>
  </Table.Tbody>
</Table>
    </Box>
  )
}

export default Associate
