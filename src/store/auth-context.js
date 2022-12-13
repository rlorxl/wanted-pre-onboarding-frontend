import React, { useState } from 'react';
const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
});

export const AuthContextProvider = (props) => {
  const tokenData = localStorage.getItem('TOKEN');

  let initialToken;
  if (tokenData) initialToken = tokenData;
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('TOKEN', token);
  };

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
