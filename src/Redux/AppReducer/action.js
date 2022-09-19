import axios from "axios";
import * as types from "./actionTypes";

export const addPatient = (payload) => (dispatch) => {
  dispatch({ type: types.ADD_PATIENT_REQ });
  return axios({
    url: "https://doctor-patients-mock.herokuapp.com/patients",
    method: "POST",
    data: payload,
  })
    .then((res) => {
      dispatch({ type: types.ADD_PATIENT_REQ_SUCCESS });
      dispatch(getPatients({ id: payload.doctor }));
    })
    .catch((e) => dispatch({ type: types.ADD_PATIENT_REQ_FAILURE }));
};

export const getPatients = (payload) => (dispatch) => {
  dispatch({ type: types.GET_PATIENTS_REQ });
  return axios({
    url: `https://doctor-patients-mock.herokuapp.com/patients?doctor=${
      payload.id
    }&_page=${payload.page || 1}&_limit=3`,
    method: "GET",
    params: payload.params || "",
  })
    .then((res) => {
      dispatch({
        type: types.GET_PATIENTS_REQ_SUCCESS,
        payload: {
          data: res.data,
          totalPatients: res.headers["x-total-count"],
        },
      });
      // console.log("aaa", res.headers["x-total-count"]);
    })
    .catch((e) => dispatch({ type: types.GET_PATIENTS_REQ_FAILURE }));
};

export const getPatientsByName = (payload) => (dispatch) => {
  dispatch({ type: types.GET_PATIENTS_BY_NAME_REQ });
  return axios({
    url: `https://doctor-patients-mock.herokuapp.com/patients?doctor=${
      payload.id
    }&_page=${payload.page || 1}&_limit=3&name=${payload.name}`,
    method: "GET",
    // params: payload.params || "",
  })
    .then((res) => {
      dispatch({
        type: types.GET_PATIENTS_BY_NAME_REQ_SUCCESS,
        payload: {
          data: res.data,
          totalPatients: res.headers["x-total-count"],
        },
      });
      // console.log("aaa", res.headers["x-total-count"]);
    })
    .catch((e) => dispatch({ type: types.GET_PATIENTS_BY_NAME_REQ_FAILURE }));
};

export const getPatientById = (payload) => (dispatch) => {
  dispatch({ type: types.GET_PATIENT_BY_ID_REQ });
  return axios({
    url: `https://doctor-patients-mock.herokuapp.com/patients/${payload}`,
    method: "GET",
    // params: payload.params || "",
  })
    .then((res) => {
      dispatch({
        type: types.GET_PATIENT_BY_ID_REQ_SUCCESS,
        payload: {
          data: res.data,
          totalPatients: res.headers["x-total-count"],
        },
      });
      console.log(res.data);
      // console.log("aaa", res.headers["x-total-count"]);
    })
    .catch((e) => dispatch({ type: types.GET_PATIENT_BY_ID_REQ_FAILURE }));
};

export const getPatientByIdAndUpdate = (payload) => (dispatch) => {
  // dispatch({ type: types.GET_PATIENT_BY_ID_REQ });
  return axios({
    url: `https://doctor-patients-mock.herokuapp.com/patients/${payload.id}`,
    method: "PATCH",
    data: payload.data,
    // params: payload.params || "",
  })
    .then((res) => {
      // dispatch(getPatientById(payload.id));
      console.log(res.data);
      // console.log("aaa", res.headers["x-total-count"]);
    })
    .catch();
};

export const getPatientByIdAndDelete = (payload) => (dispatch) => {
  // dispatch({ type: types.GET_PATIENT_BY_ID_REQ });
  return axios({
    url: `https://doctor-patients-mock.herokuapp.com/patients/${payload}`,
    method: "DELETE",

    // params: payload.params || "",
  })
    .then((res) => {
      // dispatch(getPatientById(payload.id));
      console.log(res.data);
      // dispatch(getPatients);
      // console.log("aaa", res.headers["x-total-count"]);
    })
    .catch();
};
