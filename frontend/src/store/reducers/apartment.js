import { GET_APARTMENTS } from "../actionTypes";
import {
  requestPending,
  requestSuccess,
  requestFailed,
} from "../../helper/request";

const initialState = {
  loading: false,
  status: "INIT",
  error: null,
  apartmentsInfo: [],
};

export const apartmentReducer = function (state = initialState, action) {
  switch (action.type) {
    case requestPending(GET_APARTMENTS): {
      return {
        ...state,
        status: requestPending(GET_APARTMENTS),
        loading: true,
      };
    }
    case requestSuccess(GET_APARTMENTS): {
      return {
        ...state,
        status: requestSuccess(GET_APARTMENTS),
        loading: false,
        apartmentsInfo: action.payload,
      };
    }
    case requestFailed(GET_APARTMENTS): {
      return {
        ...state,
        status: requestFailed(GET_APARTMENTS),
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
