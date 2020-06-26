import { put, call } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  requestPending,
  requestSuccess,
  requestFailed,
} from "../../helper/request";
import apiCall from "../../helper/apiCall";
import { SIGNUP, LOGIN } from "../actionTypes";

export function* signupSaga(action) {
  try {
    yield put({ type: requestPending(SIGNUP) });
    yield call(apiCall, "/auth/signup/", "POST", { ...action.payload }, false);
    yield put({ type: requestSuccess(SIGNUP) });
    yield put(push("/login"));
  } catch (error) {
    yield put({ type: requestFailed(SIGNUP), payload: error.response });
  }
}

export function* loginSaga(action) {
  try {
    yield put({ type: requestPending(LOGIN) });
    const response = yield call(
      apiCall,
      "/auth/login/",
      "POST",
      { ...action.payload },
      false
    );
    const { token } = response.data;
    window.localStorage.setItem("rental_auth_token", token);
    yield put({ type: requestSuccess(LOGIN), payload: response.data });
    yield put(push("/main"));
  } catch (error) {
    yield put({ type: requestFailed(LOGIN), payload: error.response });
  }
}
