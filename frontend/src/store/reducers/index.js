import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth";
import { apartmentReducer } from "./apartment";

const authPersistConfig = {
  key: "auth",
  storage: storage,
  blacklist: [],
};

const apartmentPersistConfig = {
  key: "apartment",
  storage: storage,
  blacklist: [
    "loading",
    "status",
    "error",  
    "apartmentsInfo",
    "apartmentsFilter",
  ],
};

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: persistReducer(authPersistConfig, authReducer),
    apartment: persistReducer(apartmentPersistConfig, apartmentReducer),
  });

export default createRootReducer;
