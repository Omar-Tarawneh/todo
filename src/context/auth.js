import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';

const API = 'https://oht-auth-api.herokuapp.com'; //process.env.API_SERVER;
const SECRET = 'secret'; //process.env.JWT_SECRET;

export const LoginContext = React.createContext();

export default function LoginProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const state = {
    loggedIn,
    login: login,
    logout: logout,
    signup: signup,
    user,
    token,
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // eslint-disable-next-line
  useEffect(() => {
    const token = cookie.load('auth');
    validateToken(token);
  }, []);

  function validateToken(token) {
    try {
      const user = jwt.verify(token, SECRET);
      //   const user = jwt.decode(token);
      setLoginState(true, token, user);
    } catch (error) {
      setLoginState(false, null, {});
      console.log(`Token Validation Error ${error.message}`);
    }
  }
  function setLoginState(loggedIn, token, user) {
    cookie.save('auth', token);
    setLoggedIn(loggedIn);
    setUser(user);
    setToken(token);
  }
  async function login(username, password) {
    try {
      const response = await superagent
        .post(`${API}/signin`)
        .set('authorization', `Basic ${btoa(`${username}:${password}`)}`);
      validateToken(response.body.token);
    } catch (error) {
      console.error('Signin Error', error.message);
    }
  }
  async function signup(username, role, email, password) {
    console.log(username, password, role);
    try {
      const response = await superagent.post(`${API}/signup`).send({
        username,
        password,
        role,
      });
      validateToken(response.body.token);
    } catch (error) {
      console.error(error.message);
    }
  }
  function logout() {
    setLoginState(false, null, {});
  }

  return (
    <LoginContext.Provider value={state}>
      {props.children}
    </LoginContext.Provider>
  );
}
