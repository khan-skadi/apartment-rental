import { put, call, select } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  requestPending,
  requestSuccess,
  requestFailed,
} from "../../helper/request";
import apiCall from "../../helper/apiCall";
import { GET_APARTMENTS } from "../actionTypes";

export function* getApartmentsSaga(action) {
  try {
    const state = yield select();
    const {
      priceValue,
      floorSizeValue,
      roomsValue,
    } = state.apartment.apartmentsFilter;
    yield put({ type: requestPending(GET_APARTMENTS) });
    console.log("action paylaod", action.payload);
    const { order, orderBy, rowsPerPage, page } = action.payload;
    const response = yield call(apiCall, "/apartments/", "GET", null, true, {
      order,
      orderBy,
      rowsCount: rowsPerPage,
      currentPage: page,
      priceMin: priceValue[0],
      priceMax: priceValue[1],
      floorSizeMin: floorSizeValue[0],
      floorSizeMax: floorSizeValue[1],
      roomsMin: roomsValue[0],
      roomsMax: roomsValue[1],
    });
    yield put({ type: requestSuccess(GET_APARTMENTS), payload: response.data });
    yield put(push("/main"));
  } catch (error) {
    yield put({ type: requestFailed(GET_APARTMENTS), payload: error.response });
  }
}
