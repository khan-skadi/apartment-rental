import React from "react";
import Main from "./main";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./store";
const { store, persistor } = configureStore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <Main />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
