import { all, takeEvery } from "redux-saga/effects";
import { SIGNUP, LOGIN, LOGOUT, GET_APARTMENTS } from "../actionTypes";

import { signupSaga, loginSaga, logoutSaga } from "./auth";
import { getApartmentsSaga } from "./apartment";

export default function* rootSaga() {
  yield all([
    takeEvery(SIGNUP, signupSaga),
    takeEvery(LOGIN, loginSaga),
    takeEvery(GET_APARTMENTS, getApartmentsSaga),
    takeEvery(LOGOUT, logoutSaga),
  ]);
}
