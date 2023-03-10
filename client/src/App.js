import { ChakraBaseProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import ForgotPassword from './Screens/ForgotPassword';
import Login from './Screens/Login';
import NotFound from './Screens/NotFound';
import Signup from './Screens/Signup';
import Splash from './Screens/Splash';
import AllTodos from './Screens/AllTodos';
import Todos from './Screens/Todos';
import NewPassword from "./Screens/NewPassword";
import Protected from './Screens/Protected';

function App() {
  return (
    <>
      <ChakraBaseProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Splash />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/todos" element={<Protected Component={Todos}/>} />
            <Route exact path="/alltodos" element={<Protected Component={AllTodos} />} />
            <Route exact path='/forgot_password' element={<ForgotPassword />} />
            <Route exact path='/new_password/:id/:token' element={<NewPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </ChakraBaseProvider>
    </>
  );
}

export default App;
