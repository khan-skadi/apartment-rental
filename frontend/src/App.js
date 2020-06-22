import React from "react";
import Main from "./main";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import configureStore from "./store";

const history = createBrowserHistory();
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
