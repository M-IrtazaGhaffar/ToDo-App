import { Flex, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Splash() {
  const navigate = useNavigate()
  setTimeout(() => {
    navigate('/login')
  }, 3000);
  return (
    <Flex gap={20} flexDirection={'column'} height={'100vh'} alignItems={'center'} justifyContent={'center'}>
      <Text textAlign={'center'} fontSize={'5xl'}>
        ToDo List
      </Text>
      <Spinner size='lg' width={'50px'} height={'50px'} />
    </Flex>
  )
}

export default Splash