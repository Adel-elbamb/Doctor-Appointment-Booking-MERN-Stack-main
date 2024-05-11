import { useState, useContext, useReducer } from "react";
const initialState = {
  user: null,
  token: null,
  role: null,
};

const authContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        token: null,
        role: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role
      };
    default:
      break;
  }
}
