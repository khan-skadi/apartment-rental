import { put, call, select } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  requestPending,
  requestSuccess,
  requestFailed,
} from "../../helper/request";
import apiCall from "../../helper/apiCall";
import { GET_REALTORS } from "../actionTypes";

export function* getRealtorsSaga(action) {
  try {
    yield put({ type: requestPending(GET_REALTORS) });

    const response = yield call(apiCall, "/users/realtors/", "GET", null, true);

    yield put({
      type: requestSuccess(GET_REALTORS),
      payload: response.data,
    });
  } catch (error) {
    yield put({ type: requestFailed(GET_REALTORS), payload: error.response });
  }
}
