// import React from "react";
// import { Provider } from "react-redux";
// import { ConnectedRouter } from "connected-react-router";
// import { Route, Switch } from "react-router-dom";
// import { I18nextProvider } from "react-i18next";
// import { ThemeProvider } from "@mui/styles";
// import { getPersistor } from "@rematch/persist";
// import { PersistGate } from "redux-persist/lib/integration/react";

// import store,{ history } from "./redux/store";
// import i18n from "./common/i18next/i18n";
// import theme from "./common/MaterialUI/Mui.theme";

// import BasicLayout from "./layouts/BasicLayout";

// const Router = () => {

//   const persistor = getPersistor();
//   return (
//     <PersistGate persistor={persistor}>
//       <Provider store={store}>
//         <ConnectedRouter history={history}>
//           <ThemeProvider theme={theme}>
//             <I18nextProvider i18n={i18n}>
//               <Switch>
//                 <Route path="/" component={BasicLayout} />
//               </Switch>
//             </I18nextProvider>
//           </ThemeProvider>
//         </ConnectedRouter>
//       </Provider>
//     </PersistGate>
//   );
// };

// export default Router;

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
