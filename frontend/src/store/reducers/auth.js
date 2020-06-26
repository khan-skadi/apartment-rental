import { SIGNUP, LOGIN } from "../actionTypes";
import {
  requestPending,
  requestSuccess,
  requestFailed,
} from "../../helper/request";

const initialState = {
  me: null,
  loading: false,
  status: "INIT",
  error: null,
};

export const authReducer = function (state = initialState, action) {
  switch (action.type) {
    case requestPending(SIGNUP): {
      return {
        ...state,
        status: requestPending(SIGNUP),
        loading: true,
      };
    }
    case requestSuccess(SIGNUP): {
      return {
        ...state,
        status: requestSuccess(SIGNUP),
        loading: false,
      };
    }
    case requestFailed(SIGNUP): {
      return {
        ...state,
        status: requestFailed(SIGNUP),
        loading: false,
        error: action.payload,
      };
    }
    case requestPending(LOGIN): {
      return {
        ...state,
        status: requestPending(LOGIN),
        loading: true,
      };
    }
    case requestSuccess(LOGIN): {
      return {
        ...state,
        me: action.payload,
        status: requestSuccess(LOGIN),
        loading: false,
      };
    }
    case requestFailed(LOGIN): {
      return {
        ...state,
        status: requestFailed(LOGIN),
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
