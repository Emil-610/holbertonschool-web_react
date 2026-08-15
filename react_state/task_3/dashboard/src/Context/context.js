import React from 'react';

const defaultUser = {
  email: '',
  password: '',
  isLoggedIn: false,
};

const defaultLogOut = () => {};

const defaultContext = {
  user: defaultUser,
  logOut: defaultLogOut,
};

const newContext = React.createContext(defaultContext);
export default newContext;
