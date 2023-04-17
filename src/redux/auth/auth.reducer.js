import {
  LOGIN_FAILED,
  LOGIN_PROGRESS,
  LOGIN_SUCCESS,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_FAILED,
  REGISTER_PROGRESS,
  REGISTER_SUCCESS,
} from "./auth.types";

const initialState = {
  token: localStorage.getItem("breezeUserToken") || null,
  loginprogress: false,
  registerprogress: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // for loader display registration page
    case REGISTER_PROGRESS:
      return {
        ...state,
        registerprogress: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerprogress: false,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        registerprogress: false,
      };

    //   for loader display login page
    case LOGIN_PROGRESS:
      return {
        ...state,
        loginprogress: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginprogress: false,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loginprogress: false,
      };

    //   for logging in user
    case LOGIN_USER: {
      // add to localStorage
      localStorage.setItem("breezeUserToken", JSON.stringify(action.payload));

      return {
        ...state,
        token: action.payload,
      };
    }

    // for log out user
    case LOGOUT_USER: {
      // remove breezeUserToken from to localStorage
      localStorage.removeItem("breezeUserToken");

      return {
        ...state,
        token: null,
      };
    }
    default:
      return state;
  }
};
