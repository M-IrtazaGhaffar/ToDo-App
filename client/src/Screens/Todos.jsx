import {
  Button,
  Box,
  Flex,
  Avatar,
  AvatarBadge,
  Text,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  useColorMode,
  useMediaQuery,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Moment from '../Components/Moment';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

function Todos() {
  const navigate = useNavigate();
  const { username, email, token } = useSelector(state => state.r1);
  const dispatch = useDispatch();
  const [Data, setData] = useState({
    todoTitle: '',
    todoDesc: '',
    todoDate: '',
    email: email,
    token: token,
  });
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const [isLargerThan800] = useMediaQuery('(min-width: 850px)');
  const [Todos, setTodos] = useState([
    {
      title: '',
      desc: '',
      start: '',
      end: '',
      _id: '',
    },
  ]);
  const [Pending, setPending] = useState([]);
  const [Loading, setLoading] = useState(false);
  const titleRef = useRef();
  const descRef = useRef();
  const dateRef = useRef();
  var i = 0;
  const getTodos = async () => {
    const res = await Axios.post('http://localhost:5000/user/getTodos', {
      email,
      token,
    });
    setTodos(res.data.todos);
  };
  const insertFunc = e => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };
  const createTodo = async () => {
    if (Data.date !== '' && Data.todoTitle !== '' && Data.todoDesc !== '') {
      try {
        setLoading(true);
        const res = await Axios.post(
          'http://localhost:5000/user/createTodo',
          Data
        );
        if (res.status === 200 && res.data.inserted === true) {
          setLoading(false);
          titleRef.current.value = '';
          descRef.current.value = '';
          dateRef.current.value = '';
          getTodos();
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
                  className="bi bi-check-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                </svg>
                Todo added!
              </Box>
            ),
          });
        }
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
    } else {
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
            ToDo must contain a title, description and an ending time!
          </Box>
        ),
      });
    }
  };

  const updateTodo = async (status, id) => {
    try {
      const res = await Axios.put('http://localhost:5000/user/updateTodo', {
        email,
        status,
        id,
        token,
      });
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
              ToDo {status}!
            </Box>
          ),
        });
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
            Network Error!
          </Box>
        ),
      });
    }
  };
  const logout = () => {
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
          Logged out!
        </Box>
      ),
    });
    navigate('/login');
    dispatch({
      type: 'logout'
    })
  }
  useEffect(() => {
    getTodos();
  });

  return (
    <>
      <Box>
        <Flex
          boxShadow={'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}
          alignItems={'center'}
          justifyContent={'space-between'}
          p={5}
        >
          <Flex alignItems={'center'} gap={3}>
            <Avatar
              height={'50px'}
              name={username}
              bgColor={'gray.500'}
              color={'whitesmoke'}
              p={4}
            >
              <AvatarBadge
                boxSize="1.25em"
                border={'2px solid whitesmoke'}
                borderRadius={'100%'}
                bg="green.500"
              />
            </Avatar>

            <Text fontSize={'25px'} fontWeight={'semibold'}>
              Hello
            </Text>
          </Flex>
          <Flex>
            <Button
              borderRadius={'100%'}
              p={4}
              bgColor={`${colorMode === 'light' ? 'red.400' : 'red.500'}`}
              onClick={logout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-box-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                />
                <path
                  fillRule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                />
              </svg>
            </Button>
          </Flex>
        </Flex>

        <Flex
          width={'100%'}
          height={`${isLargerThan800 ? '90vh' : ''}`}
          mt={5}
          alignItems={'center'}
          justifyContent={'center'}
          p={isLargerThan800 ? 10 : 5}
          flexDirection={`${isLargerThan800 ? 'row' : 'column'} `}
          gap={`${isLargerThan800 ? '' : 7}`}
        >
          <Flex
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={5}
            borderRight={`${isLargerThan800 ? '2px solid #41424C' : 'none'} `}
            width={`${isLargerThan800 ? '50%' : '100%'}`}
            // height={'70vh'}
          >
            <Text color={'teal.500'} fontSize={'sm'}>
              Have a busy day? Make a Todo for it.
            </Text>
            <Moment />
            <Flex
              width={'100%'}
              // bgColor={'black'}
              flexDirection={'column'}
              gap={5}
              p={isLargerThan800 ? 5 : 0}
            >
              <Flex width={'100%'}>
                <FormControl width={'100%'}>
                  <FormLabel fontSize={'xs'}>Title</FormLabel>
                  <Input
                    ref={titleRef}
                    type={'text'}
                    width={'100%'}
                    py={2}
                    px={3}
                    placeholder={'Todo title'}
                    my={1}
                    borderRadius={5}
                    outline={'none'}
                    fontSize={'sm'}
                    bgColor={`${
                      colorMode === 'light' ? 'gray.100' : 'gray.700'
                    }`}
                    name={'todoTitle'}
                    onChange={insertFunc}
                  />
                  <FormLabel fontSize={'xs'}>Description</FormLabel>
                  <Textarea
                    ref={descRef}
                    resize={'none'}
                    width={'100%'}
                    height={'150px'}
                    placeholder={'Describe your Todo here'}
                    py={2}
                    px={3}
                    my={1}
                    borderRadius={5}
                    outline={'none'}
                    fontSize={'sm'}
                    bgColor={`${
                      colorMode === 'light' ? 'gray.100' : 'gray.700'
                    }`}
                    name={'todoDesc'}
                    onChange={insertFunc}
                  />
                  <FormLabel fontSize={'xs'}>Date</FormLabel>
                  <Input
                    ref={dateRef}
                    type={'datetime-local'}
                    width={'100%'}
                    py={2}
                    px={3}
                    my={1}
                    borderRadius={5}
                    outline={'none'}
                    fontSize={'sm'}
                    bgColor={`${
                      colorMode === 'light' ? 'gray.100' : 'gray.700'
                    }`}
                    name={'todoDate'}
                    onChange={insertFunc}
                  />
                </FormControl>
              </Flex>
              <Flex width={'100%'} justifyContent={'end'}>
                <button
                  onClick={createTodo}
                  style={{
                    backgroundColor: 'teal',
                    padding: '8px 20px 8px 20px',
                    borderRadius: '5px',
                    color: 'whitesmoke',
                  }}
                  disabled={Loading}
                >
                  {Loading ? (
                    <Flex gap={2} alignItems={'center'}>
                      <Spinner width={4} height={4} />
                      Adding
                    </Flex>
                  ) : (
                    'Add To Do'
                  )}
                </button>
              </Flex>
            </Flex>
          </Flex>

          <Box width={`${isLargerThan800 ? '50%' : '100%'}`} height={'70vh'}>
            <Text
              fontSize={'3xl'}
              textAlign={'center'}
              fontWeight={'normal'}
              pb={2}
            >
              Your Todos
            </Text>
            <Box
              overflow={'scroll'}
              height={'60vh'}
              overflowX={'hidden'}
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
            >
              {Todos.length === 0 ? (
                <Flex
                  alignItems={'center'}
                  justifyContent={'center'}
                  height={'100%'}
                  gap={1}
                >
                  <Text
                    fontSize={'3xl'}
                    fontWeight={'thin'}
                    textAlign={'center'}
                  >
                    You don't have any Todos till now!
                  </Text>
                </Flex>
              ) : (
                Todos.map(item => {
                  return item.status === 'Pending' ? (
                    <Flex px={`${isLargerThan800 ? 5 : 2}`} py={2} gap={2}>
                      <Flex
                        borderRadius={10}
                        width={'100%'}
                        flexDirection={'column'}
                        p={4}
                        textAlign={'justify'}
                        bgColor={`${
                          colorMode === 'light' ? 'gray.100' : 'gray.700'
                        }`}
                        key={item._id}
                        gap={2}
                      >
                        <Text fontWeight={'bold'}>
                          #{++i} &nbsp; {item.title}
                        </Text>
                        <Text
                          fontWeight={'semibold'}
                          display={'flex'}
                          alignItems={'center'}
                          gap={2}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-chevron-double-right"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
                            />
                          </svg>
                          {item.status}
                        </Text>
                        <Text fontSize={'sm'}>{item.desc}</Text>
                        <Text fontSize={'xs'}>
                          Created: {item.start.slice(0, 10)}
                        </Text>
                        <Text fontSize={'xs'}>
                          Ending: {item.end.slice(0, 10)}
                        </Text>
                        <Flex justifyContent={'end'} gap={2}>
                          <Button
                            bgColor={'green.400'}
                            p={1}
                            borderRadius={'100%'}
                            color={'whitesmoke'}
                            onClick={() => updateTodo('Completed', item._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              fill="currentColor"
                              className="bi bi-check2"
                              viewBox="0 0 16 16"
                            >
                              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                            </svg>
                          </Button>
                          <Button
                            bgColor={'red.400'}
                            p={1}
                            borderRadius={'100%'}
                            color={'whitesmoke'}
                            onClick={() => updateTodo('Cancelled', item._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              fill="currentColor"
                              className="bi bi-x"
                              viewBox="0 0 16 16"
                            >
                              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                          </Button>
                        </Flex>
                      </Flex>
                    </Flex>
                  ) : (
                    ''
                  );
                })
              )}
              <Flex fontSize={'2xl'} alignItems={'center'} height={'100%'} justifyContent={'center'}>
                {
                  i > 0 ? '' : "You don't have any Todos right now!"
                }
              </Flex>
            </Box>
          </Box>
        </Flex>
        <Text
          textAlign={'center'}
          color={'teal.400'}
          p={4}
          onClick={() => navigate('/alltodos')}
          cursor={'pointer'}
        >
          Have a look on all todos?
        </Text>
      </Box>
    </>
  );
}

export default Todos;
