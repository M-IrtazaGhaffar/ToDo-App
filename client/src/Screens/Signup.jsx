import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Text,
  useColorMode,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useDispatch } from 'react-redux';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  const [Data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
  });
  const [Loading, setLoading] = useState(false);
  const insertFunc = e => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };
  const signupFunc = async () => {
    try {
      if (Data.password !== Data.confirmpassword) {
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
              gap={2}
              justifyContent={'center'}
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
              Passwords don't match!
            </Box>
          ),
        });
      } else {
        setLoading(true);
        const res = await Axios.post('http://localhost:5000/user/signup', Data);
        if (res.status === 200 && res.data.loggedIn === true) {
          setLoading(false);
          dispatch({
            type: 'login',
            payload: {
              username: res.data.username,
              token: res.data.token,
              email: res.data.email
            },
          });
          navigate('/todos');
        } else {
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
                gap={2}
                justifyContent={'center'}
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
                Email already in use!
              </Box>
            ),
          });
        }
      }
    } catch (error) {
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
    <Flex alignItems={'center'} justifyContent={'center'} height={'100vh'}>
      <Box>
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
            sign in to your account
            <Text color={'teal.500'} fontSize={'xs'} textTransform={'none'}>
              <Button onClick={() => navigate('/login')}>
                Already registered?
              </Button>
            </Text>
          </Heading>
          <FormLabel fontSize={'xs'}>Username</FormLabel>
          <Input
            type={'text'}
            width={'100%'}
            py={1}
            px={3}
            my={1}
            borderRadius={5}
            outline={'none'}
            fontSize={'sm'}
            bgColor={`${colorMode === 'light' ? 'gray.100' : 'gray.700'}`}
            name="username"
            onChange={insertFunc}
          />
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
            name="email"
            onChange={insertFunc}
          />
          <FormLabel fontSize={'xs'}>Password</FormLabel>
          <Input
            type={'password'}
            width={'100%'}
            py={1}
            px={3}
            my={1}
            borderRadius={5}
            fontSize={'sm'}
            outline={'none'}
            bgColor={`${colorMode === 'light' ? 'gray.100' : 'gray.700'}`}
            name="password"
            onChange={insertFunc}
          />
          <FormLabel fontSize={'xs'}>Confirm Password</FormLabel>
          <Input
            type={'password'}
            width={'100%'}
            py={1}
            px={3}
            my={1}
            borderRadius={5}
            fontSize={'sm'}
            outline={'none'}
            bgColor={`${colorMode === 'light' ? 'gray.100' : 'gray.700'}`}
            name="confirmpassword"
            onChange={insertFunc}
          />
          <Text fontSize={'xs'} textAlign={'right'} color={'teal.500'}>
            Forgot your password?
          </Text>
          <Button
            textAlign={'center'}
            fontSize={'sm'}
            width={'100%'}
            my={5}
            bgColor={'teal.500'}
            color={'whitesmoke'}
            p={1}
            borderRadius={3}
            onClick={signupFunc}
          >
            {Loading ? <Spinner width={'21px'} height={'21px'} /> : 'Sign Up'}
          </Button>
        </FormControl>
      </Box>
    </Flex>
  );
}

export default Signup;
