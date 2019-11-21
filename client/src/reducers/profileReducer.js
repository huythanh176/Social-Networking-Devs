import axios from "axios";
import { GET_ERRORS } from "./errorsReducer";
import { SET_CURRENT_USER } from "./authReducer";
export const GET_PROFILE = "GET_PROFILE";
export const PROFILE_LOADING = "PROFILE_LOADING";
export const PROFILE_NOT_FOUND = "PROFILE_NOT_FOUND";
export const CLEAR_CURRENT_PROFILE = "CLEAR_CURRENT_PROFILE";
export const GET_PROFILES = "GET_PROFILES";

//get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch({ type: PROFILE_LOADING });
  axios
    .get("/api/profiles")
    .then(res => {
      dispatch({ type: GET_PROFILE, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_PROFILE, payload: {} }));
};

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profiles", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// get all profile
export const getProfiles = () => dispatch => {
  dispatch({ type: PROFILE_LOADING });
  axios
    .get("/api/profiles/all")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

export const deleteAccount = () => dispatch => {
  axios
    .delete("/api/profiles")
    .then(() => dispatch({ type: SET_CURRENT_USER, payload: {} }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const addEducation = (expData, history) => dispatch => {
  axios
    .post("/api/profiles/education", expData)
    .then(res => history.push("/dashboard"))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const addExperience = (eduData, history) => dispatch => {
  axios
    .post("/api/profiles/experience", eduData)
    .then(res => history.push("/dashboard"))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Delete Experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profiles/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Education
export const deleteEducation = id => dispatch => {
  axios
    .delete(`/api/profiles/education/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
  }
};
