import { all, takeEvery } from "redux-saga/effects";
import { SIGNUP, LOGIN, GET_APARTMENTS } from "../actionTypes";

import { signupSaga, loginSaga } from "./auth";
import { getApartmentsSaga } from "./apartment";

export default function* rootSaga() {
  yield all([
    takeEvery(SIGNUP, signupSaga),
    takeEvery(LOGIN, loginSaga),
    takeEvery(GET_APARTMENTS, getApartmentsSaga),
  ]);
}
