import { Box, Button, Flex, Textarea, TextInput } from '@mantine/core'
import React, { useState } from 'react'

const Incident = () => {

            
    const [value,setvalue] = useState("")

    const hadlereport = ()=>{
        
    }
  return (
    <Box px={50} bd="1px solid black" >
      <Flex>
        <Textarea value={value} onChange={(event) => setvalue(event.currentTarget.value)} />
        <Button>Report</Button>
        </Flex>
    </Box>
  )
}

export default Incident
