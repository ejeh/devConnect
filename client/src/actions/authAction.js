import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "../actions/types";

// Register User
export const registerUser = (data, history) => dispatch => {
  axios
    .post("/api/users/register", data)
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login user
export const loginUser = data => dispatch => {
  axios
    .post("/api/users/login", data)
    .then(res => {
      // save to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      // set token to auth header

      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set login user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Logout user
export const logoutUser = () => dispatch => {
  // Remove token from localStorage storage
  localStorage.removeItem("jwtToken");

  // Remove auth header for future requests
  setAuthToken(false);

  // Set the current user to an empty {} which will isAuthencated  false
  dispatch(setCurrentUser({}));
};
