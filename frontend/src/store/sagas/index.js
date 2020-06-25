import { all, takeEvery } from "redux-saga/effects";
import { SIGNUP, LOGIN } from "../actionTypes";

import { signupSaga, loginSaga } from "./auth";

export default function* rootSaga() {
  yield all([takeEvery(SIGNUP, signupSaga), takeEvery(LOGIN, loginSaga)]);
}
