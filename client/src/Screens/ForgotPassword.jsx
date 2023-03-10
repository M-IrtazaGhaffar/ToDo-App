import {
  Flex,
  FormControl,
  Heading,
  useColorMode,
  useMediaQuery,
  Input,
  FormLabel,
  Button,
  Text,
  useToast,
  Spinner,
  Box,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Axios from 'axios';

function ForgotPassword() {
  const toast = useToast();
  const { colorMode } = useColorMode();
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  const [Email, setEmail] = useState('');
  const [Loading, setLoading] = useState(false);
  const sendEmail = async () => {
    try {
      setLoading(true);
      const res = await Axios.post(
        'http://localhost:5000/user/forgotPassword',
        {
          email: Email,
        }
      );
      if (res.status === 200 && res.data.found === true)
        toast({
          position: 'top',
          render: () => (
            <Box
              borderRadius={5}
              color="white"
              p={3}
              bg="green.500"
              display="flex"
              alignItems="center"
              justifyContent={'center'}
              gap={1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-info-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </svg>
              Reset password link sent!
            </Box>
          ),
        });
      else
        toast({
          position: 'top',
          render: () => (
            <Box
              borderRadius={5}
              color="white"
              p={3}
              bg="blue.500"
              display="flex"
              alignItems="center"
              justifyContent={'center'}
              gap={1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-info-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </svg>
              User email not found!
            </Box>
          ),
        });
    } catch (error) {
      setLoading(false);
      toast({
        position: 'top',
        render: () => (
          <Box
            borderRadius={5}
            color="white"
            p={3}
            bg="red.500"
            display="flex"
            alignItems="center"
            justifyContent={'center'}
            gap={1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-info-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
            </svg>
            Network error!
          </Box>
        ),
      });
    }
  };
  return (
    <Flex height={'100vh'} alignItems={'center'} justifyContent={'center'}>
      <FormControl
        border={`1px solid ${colorMode === 'light' ? 'white' : '#41424C'}`}
        padding={7}
        borderRadius={5}
        width={`${isLargerThan800 ? '35vw' : '90vw'}`}
        boxShadow={'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}
      >
        <Heading
          textTransform={'capitalize'}
          fontSize={'2xl'}
          fontWeight={'light'}
          mb={5}
          textAlign={'center'}
        >
          forgot your password
          <Text color={'teal.500'} fontSize={'xs'} textTransform={'none'}>
            Please enter your Email Address below to help us find your Identity
          </Text>
        </Heading>
        <FormLabel fontSize={'xs'}>Email address</FormLabel>
        <Input
          type={'email'}
          width={'100%'}
          py={1}
          px={3}
          my={1}
          borderRadius={5}
          outline={'none'}
          fontSize={'sm'}
          bgColor={`${colorMode === 'light' ? 'gray.100' : 'gray.700'}`}
          onChange={e => setEmail(e.target.value)}
        />
        <Button
          textAlign={'center'}
          fontSize={'sm'}
          width={'100%'}
          my={5}
          bgColor={'teal.500'}
          color={'whitesmoke'}
          p={1}
          borderRadius={3}
          onClick={sendEmail}
        >
          {Loading ? (
            <Spinner width={'21px'} height={'21px'} />
          ) : (
            'Verify Identity'
          )}
        </Button>
      </FormControl>
    </Flex>
  );
}

export default ForgotPassword;
