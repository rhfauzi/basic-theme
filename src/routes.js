import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@mui/styles";
import { getPersistor } from "@rematch/persist";
import { PersistGate } from "redux-persist/lib/integration/react";

import store, { history } from "./redux/store";
import theme from "./common/MaterialUI/Mui.theme";

import BasicLayout from "./BasicLayout";

const Router = () => {
  const persistor = getPersistor();
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ThemeProvider theme={theme}>
            <Switch>
              <Route path="/" component={BasicLayout} />
            </Switch>
          </ThemeProvider>
        </ConnectedRouter>
      </Provider>
    </PersistGate>
  );
};

export default Router;
