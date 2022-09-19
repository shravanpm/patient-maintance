import axios from "axios";
import * as types from "./actionTypes";

export const regDoctor = (payload) => (dispatch) => {
  dispatch({ type: types.SIGNUP_REQ });
  return axios({
    url: "https://doctor-patients-mock.herokuapp.com/doctors",
    method: "POST",
    data: payload,
  })
    .then((res) => {
      console.log(res.data);
      dispatch({ type: types.SIGNUP_REQ_SUCCESS });
      dispatch(getAllDoctor());
      if (res.data) {
        return true;
      }
      return false;
    })
    .catch((e) => {
      dispatch({ type: types.SIGNUP_REQ_FAILURE });
      return false;
    });
};

export const loginDoctor = (payload) => (dispatch) => {
  dispatch({ type: types.LOGIN_REQ });
  return axios({
    url: `https://doctor-patients-mock.herokuapp.com/doctors?q=${payload.name}`,
    method: "GET",
  })
    .then((res) => {
      console.log(res.data);

      if (payload.password == res.data[0].password) {
        dispatch({ type: types.LOGIN_REQ_SUCCESS, payload: res.data[0] });
        return true;
      } else {
        dispatch({ type: types.LOGIN_REQ_FAILURE });
      }
      return false;
    })
    .catch((e) => {
      dispatch({ type: types.LOGIN_REQ_FAILURE });
      return false;
    });
};

export const logoutDoctor = () => (dispatch) => {
  dispatch({ type: types.LOGOUT_REQ });
};

export const getAllDoctor = (payload) => (dispatch) => {
  dispatch({ type: types.GET_ALL_DOCTORS_REQ });
  return axios({
    url: "https://doctor-patients-mock.herokuapp.com/doctors",
    method: "GET",
  })
    .then((res) => {
      console.log(res.data);
      dispatch({ type: types.GET_ALL_DOCTORS_REQ_SUCCESS, payload: res.data });
      if (res.data) {
        return true;
      }
      return false;
    })
    .catch((e) => {
      dispatch({ type: types.GET_ALL_DOCTORS_REQ_FAILURE });
      return false;
    });
};
