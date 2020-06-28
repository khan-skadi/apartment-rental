import { all, takeEvery } from "redux-saga/effects";
import {
  SIGNUP,
  LOGIN,
  LOGOUT,
  GET_APARTMENTS,
  GET_REALTORS,
} from "../actionTypes";

import { signupSaga, loginSaga, logoutSaga } from "./auth";
import { getApartmentsSaga } from "./apartment";
import { getRealtorsSaga } from "./users";

export default function* rootSaga() {
  yield all([
    takeEvery(SIGNUP, signupSaga),
    takeEvery(LOGIN, loginSaga),
    takeEvery(GET_REALTORS, getRealtorsSaga),
    takeEvery(GET_APARTMENTS, getApartmentsSaga),
    takeEvery(LOGOUT, logoutSaga),
  ]);
}
