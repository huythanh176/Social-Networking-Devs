import axios from "axios";
import { GET_ERRORS } from "./errorsReducer";
import setAuthToken from "../utils/setAuthToken";
import isEmpty from "../utils/isEmpty";
import jwt_decode from "jwt-decode";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const registerUser = (userData, history) => dispatch =>
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // save into local Storage
      const { token } = res.data;
      // set token
      localStorage.setItem("jwtToken", token);
      // set token to auth header
      setAuthToken(token);
      // decode jwt token to get user data
      const decoded = jwt_decode(token);
      dispatch({ type: SET_CURRENT_USER, payload: decoded });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const logoutUser = () => dispatch => {
  // remove jwt Token
  localStorage.removeItem("jwtToken");
  // remove auth header
  setAuthToken(false);
  // set current user to empty object which will set authenticated false
  dispatch({ type: SET_CURRENT_USER, payload: {} });
};

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case SET_CURRENT_USER: {
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !isEmpty(action.payload)
      };
    }
  }
};
