import React, { useEffect, useState } from 'react';
import {
  Text,
  Flex,
  useColorMode,
  Button,
  useMediaQuery,
  Box,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Axios from 'axios';

function AllTodos() {
  const toast = useToast();
  const { email, token } = useSelector(state => state.r1);
  const [Todos, setTodos] = useState([]);
  const { colorMode } = useColorMode();
  const [Loading, setLoading] = useState(false);
  const status = 'Completed';
  const navigate = useNavigate();
  const [isLargerThan800] = useMediaQuery('(min-width: 850px)');
  var i = 0;

  const getTodos = async () => {
    try {
      setLoading(true);
      const res = await Axios.post('http://localhost:5000/user/getTodos', {
        email,
        token,
      });
      setTodos(res.data.todos);
      if (res.status === 200) {
        setLoading(false);
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
  const arr = [1, 2, 3];
  useEffect(() => {
    getTodos();
  }, []);
  console.log(Todos);

  return (
    <>
      <Text textAlign={'center'} fontSize={'4xl'} m={5}>
        Recent ToDos
        <Text fontSize={'md'} color={'teal.500'}>
          Have a look on all of your ToDos.
        </Text>
      </Text>
      {
        Loading ? 
        <Flex alignItems={'center'} justifyContent={'center'} height={'100vh'}>
          <Spinner width={'30px'} height={'30px'} />
        </Flex>
        :
        <Flex
        minHeight={'100vh'}
        flexWrap={'wrap'}
        gap={5}
        p={7}
        alignItems={'center'}
        justifyContent={'center'}
      >
        {
          Todos.map(item => {
            return (
              <Flex
                p={5}
                borderRadius={'10px'}
                bgColor={`${colorMode === 'light' ? 'gray.100' : 'gray.700'}`}
                width={isLargerThan800 ? '30%' : '100%'}
                gap={2}
                flexDirection={'column'}
              >
                <Text>
                  #{++i}
                  &nbsp; &nbsp;
                  {item.title}
                </Text>
                <Text
                  fontSize={'sm'}
                  textAlign={'justify'}
                  height={'150px'}
                  overflowY={'scroll'}
                  css={{
                    '&::-webkit-scrollbar': {
                      width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                      width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: 'gray',
                      borderRadius: '24px',
                    },
                  }}
                  pr={2}
                >
                  {item.desc}
                </Text>
                <Text fontSize={'sm'}>Created: {item.start.slice(0, 10)}</Text>
                <Text fontSize={'sm'}>Ending: {item.end.slice(0, 10)}</Text>
                <Text
                  bgColor={
                    item.status === 'Completed'
                      ? 'green.500'
                      : item.status === 'Pending'
                      ? 'yellow.500'
                      : 'red.500'
                  }
                  fontSize={'sm'}
                  borderRadius={'10px'}
                  textAlign={'center'}
                  p={1}
                  color={'whitesmoke'}
                >
                  {item.status}
                </Text>
              </Flex>
            );
          })
        }
      </Flex>
      }
      <Flex alignItems={'center'} justifyContent={'center'}>
        <Button
          width={isLargerThan800 ? '30%' : '100%'}
          bg={'teal.500'}
          p={2}
          m={5}
          borderRadius={'10px'}
          color={'whitesmoke'}
          onClick={() => navigate('/todos')}
          fontSize={'sm'}
        >
          Back to Home
        </Button>
      </Flex>
    </>
  );
}

export default AllTodos;
