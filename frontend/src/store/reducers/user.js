import { GET_REALTORS } from "../actionTypes";
import {
  requestPending,
  requestSuccess,
  requestFailed,
} from "../../helper/request";

const initialState = {
  loading: false,
  status: "INIT",
  error: null,
  realtorsInfo: null,
};

export const userReducer = function (state = initialState, action) {
  switch (action.type) {
    case requestPending(GET_REALTORS): {
      return {
        ...state,
        status: requestPending(GET_REALTORS),
        loading: true,
      };
    }
    case requestSuccess(GET_REALTORS): {
      return {
        ...state,
        status: requestSuccess(GET_REALTORS),
        loading: false,
        realtorsInfo: action.payload,
      };
    }
    case requestFailed(GET_REALTORS): {
      return {
        ...state,
        status: requestFailed(GET_REALTORS),
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
