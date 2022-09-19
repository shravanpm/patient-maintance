import * as types from "./actionTypes";

const initialState = {
  patients: [],
  patient: {},
  isLoading: false,
  isError: false,
  totalPatients: 1,
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_PATIENTS_REQ: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.GET_PATIENTS_REQ_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        patients: payload.data,
        totalPatients: payload.totalPatients,
      };
    }
    case types.GET_PATIENTS_REQ_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }

    case types.ADD_PATIENT_REQ: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.ADD_PATIENT_REQ_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case types.ADD_PATIENT_REQ_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }

    case types.GET_PATIENTS_BY_NAME_REQ: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.GET_PATIENTS_BY_NAME_REQ_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        patients: payload.data,
        totalPatients: payload.totalPatients,
      };
    }
    case types.GET_PATIENTS_BY_NAME_REQ_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }

    case types.GET_PATIENT_BY_ID_REQ: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.GET_PATIENT_BY_ID_REQ_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        patient: payload.data,
      };
    }
    case types.GET_PATIENT_BY_ID_REQ_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    default:
      return state;
  }
};
