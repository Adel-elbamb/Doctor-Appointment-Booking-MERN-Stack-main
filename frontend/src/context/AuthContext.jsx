import React, { useState, useContext, useReducer, createContext, useEffect } from "react";
const initialUser = localStorage.getItem('user');

const initialState = {
  user: initialUser  !== undefined ? JSON.parse(initialUser) : null,
  role: localStorage.getItem('role') || null,
  token: localStorage.getItem('token') || null,
};

export const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        token: null,
        role: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
      };
    case "LOGOUT":
      return {
        user: null,
        token: null,
        role: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // console.log(state)
    localStorage.setItem('user', JSON.stringify(state.user));
    localStorage.setItem('token', state.token);
    localStorage.setItem('role', state.role);
  }, [state]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        role: state.role,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
