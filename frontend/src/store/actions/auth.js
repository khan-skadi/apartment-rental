import { SIGNUP, LOGIN, LOGOUT } from "../actionTypes";

export const signup = (payload) => {
  return { type: SIGNUP, payload };
};

export const login = (payload) => {
  return { type: LOGIN, payload };
};

export const logout = () => {
  return { type: LOGOUT };
};
