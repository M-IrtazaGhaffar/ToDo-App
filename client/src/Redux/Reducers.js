import { createReducer } from '@reduxjs/toolkit';

const initialStateR1 = {
  login: false,
  username: '',
  token: '',
  email: ''
};

const Reducer1 = createReducer(initialStateR1, {
  login: (state, action) => {
    state.login = true;
    state.username = action.payload.username;
    state.token = action.payload.token;
    state.email = action.payload.email;
  },
  logout: (state) => {
    state.login = false;
    state.username = '';
    state.email = '';
    state.token = '';
  }
});

export default Reducer1;
