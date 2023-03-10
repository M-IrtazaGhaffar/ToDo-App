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
  Box,
  useToast,
} from '@chakra-ui/react';
import Axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

function NewPassword() {
    const params = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  const [Data, setData] = useState({
    password: '',
    confirm: '',
  });
  const insertData = (e) => {
    setData({...Data, [e.target.name]: e.target.value});
  }
  const sendPass = async () => {
    console.log(Data);
    if (Data.password !== Data.confirm) {
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
            Passwords should match!
          </Box>
        ),
      });
    } else {
      try {
        const res = await Axios.post(
          'http://localhost:5000/user/resetPassword',
          {
            id: params.id,
            password: Data.password,
            token: params.token
          }
        );
        if (res.status === 200 && res.data.updated === true) {
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
                Password reset successful!
              </Box>
            ),
          });
          navigate('/login');
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
          Reset Password
          <Text color={'teal.500'} fontSize={'xs'} textTransform={'none'}>
            Please enter new password
          </Text>
        </Heading>
        <FormLabel fontSize={'xs'}>New Password</FormLabel>
        <Input
          type={'password'}
          name={'password'}
          width={'100%'}
          py={1}
          px={3}
          my={1}
          borderRadius={5}
          outline={'none'}
          fontSize={'sm'}
          bgColor={`${colorMode === 'light' ? 'gray.100' : 'gray.700'}`}
          onClick={insertData}
        />
        <FormLabel fontSize={'xs'}>Confirm Password</FormLabel>
        <Input
          type={'password'}
          name={'confirm'}
          width={'100%'}
          py={1}
          px={3}
          my={1}
          borderRadius={5}
          outline={'none'}
          fontSize={'sm'}
          bgColor={`${colorMode === 'light' ? 'gray.100' : 'gray.700'}`}
          onClick={insertData}
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
          onClick={sendPass}
        >
          Change Password
        </Button>
      </FormControl>
    </Flex>
  );
}

export default NewPassword;
