import { useState } from "react";
import { Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { PersistGate } from "redux-persist/lib/integration/react";
import { getPersistor } from "@rematch/persist";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import store, { history } from "./redux/store";
import BasicLayout from "./components/BasicLayout";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const persistor = getPersistor();

  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <div className="app">
                <Sidebar isSidebar={isSidebar} />
                <main className="content">
                  <Topbar setIsSidebar={setIsSidebar} />
                  <Route path="/" component={BasicLayout} />
                </main>
              </div>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </ConnectedRouter>
      </Provider>
    </PersistGate>
  );
}

export default App;
