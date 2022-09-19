import * as types from "./actionTypes";

const initialState = {
  isAuth: false,
  doctor: {},
  doctors: [],
  isLoading: false,
  isError: false,
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SIGNUP_REQ: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.SIGNUP_REQ_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case types.SIGNUP_REQ_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }

    case types.LOGIN_REQ: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.LOGIN_REQ_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        doctor: payload,
      };
    }
    case types.LOGIN_REQ_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }

    case types.LOGOUT_REQ: {
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        doctor: {},
      };
    }

    case types.GET_ALL_DOCTORS_REQ: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.GET_ALL_DOCTORS_REQ_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        doctors: payload,
      };
    }
    case types.GET_ALL_DOCTORS_REQ_SUCCESS: {
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
