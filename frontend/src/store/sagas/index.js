import { all, takeEvery } from "redux-saga/effects";
import {
  SIGNUP,
  LOGIN,
  LOGOUT,
  ADD_APARTMENT,
  UPDATE_APARTMENT,
  DELETE_APARTMENT,
  GET_APARTMENTS,
  GET_REALTORS,
  GET_TOTAL_APARTMENTS,
} from "../actionTypes";

import { signupSaga, loginSaga, logoutSaga } from "./auth";
import {
  addApartmentSaga,
  getApartmentsSaga,
  updateApartmentSaga,
  deleteApartmentSaga,
  getTotalApartmentsSaga,
} from "./apartment";
import { getRealtorsSaga } from "./users";

export default function* rootSaga() {
  yield all([
    takeEvery(SIGNUP, signupSaga),
    takeEvery(LOGIN, loginSaga),
    takeEvery(GET_REALTORS, getRealtorsSaga),
    takeEvery(ADD_APARTMENT, addApartmentSaga),
    takeEvery(UPDATE_APARTMENT, updateApartmentSaga),
    takeEvery(DELETE_APARTMENT, deleteApartmentSaga),
    takeEvery(GET_APARTMENTS, getApartmentsSaga),
    takeEvery(GET_TOTAL_APARTMENTS, getTotalApartmentsSaga),
    takeEvery(LOGOUT, logoutSaga),
  ]);
}
